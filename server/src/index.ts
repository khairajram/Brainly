import "dotenv/config";
import express, { Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import cors from "cors";

import { auth, AuthenticatedRequest } from "./middleware/auth.js";
import { Tag, Content, User, Link } from "./db.js";

const PORT: number = parseInt(process.env.PORT || "3000");
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.post("/api/v1/signup", async (req: Request, res: Response) => {
  const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );
  const signupInput = z.object({
    username: z
      .string({
        required_error: "username is required",
        invalid_type_error: "username must be a string",
      })
      .min(3, { message: "Username must be 3 or more characters long" })
      .max(20, { message: "Username must not be more than 20 characters" })
      .trim(),
    password: z
      .string({
        required_error: "password is required",
        invalid_type_error: "password must be a string",
      })
      .min(8, { message: "password must be 8 or more characters long" })
      .max(64, { message: "password must not be more than 64 characters" })
      .trim()
      .regex(passwordValidation, {
        message:
          "Password must contain upper, lower, number and special character and be at least 8 chars",
      }),
  });

  try {
    const isValid = signupInput.safeParse(req.body);

    if (!isValid.success) {
      res.status(400).json({
        message: "Error in inputs",
        error: isValid.error.errors,
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(isValid.data.password, 5);
    const dbResponse = await User.create({
      username: isValid.data.username,
      password: hashedPassword,
    });

    const token = jwt.sign({ _id: dbResponse._id }, JWT_SECRET as string, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Signed up",
      token,
      username: dbResponse.username,
    });
  } catch (e: any) {
    if (e.code === 11000) {
      res.status(409).json({ error: "Username already exists" });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/v1/signin", async (req: Request, res: Response) => {
  const signinInput = z.object({
    username: z
      .string({
        required_error: "username is required",
        invalid_type_error: "username must be a string",
      })
      .trim(),
    password: z
      .string({
        required_error: "password is required",
        invalid_type_error: "password must be a string",
      })
      .trim(),
  });

  try {
    const isValid = signinInput.safeParse(req.body);
    if (!isValid.success) {
      res.status(411).json({
        message: "Error in inputs",
        error: isValid.error,
      });
      return;
    }

    const user = await User.findOne({ username: isValid.data.username });

    if (!user) {
      res.status(403).json({ message: "User does not exist" });
      return;
    }

    const isPassCorrect = await bcrypt.compare(isValid.data.password, user.password);

    if (!isPassCorrect) {
      res.status(403).json({ message: "Wrong password" });
      return;
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET as string, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      username: user.username,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message || "Internal Server Error" });
  }
});

const contentInput = z.object({
  link: z.string({ required_error: "link is required" }).url({ message: "Invalid url" }),
  type: z.enum(["image", "video", "article", "audio"]),
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title must be a string",
    })
    .trim()
    .min(1, { message: "title must not be empty" }),
  tags: z.array(z.string().trim()).optional().default([]),
});

async function resolveTagIds(titles: string[]) {
  const normalized = Array.from(
    new Set(
      titles
        .map((t) => t.trim().replace(/^#/, "").toLowerCase())
        .filter((t) => t.length > 0)
    )
  );
  const ids: mongoose.Types.ObjectId[] = [];
  for (const title of normalized) {
    const existing = await Tag.findOneAndUpdate(
      { title },
      { $setOnInsert: { title } },
      { upsert: true, new: true }
    );
    ids.push(existing._id as mongoose.Types.ObjectId);
  }
  return ids;
}

app.post("/api/v1/content", auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const isValid = contentInput.safeParse(req.body);

    if (!isValid.success) {
      res.status(400).json({
        message: "Error in inputs",
        error: isValid.error.errors,
      });
      return;
    }

    const tagIds = await resolveTagIds(isValid.data.tags);

    const dbResponse = await Content.create({
      type: isValid.data.type,
      link: isValid.data.link,
      title: isValid.data.title,
      tags: tagIds,
      userId: req._id,
    });

    res.status(200).json({ message: "Content created", content: dbResponse });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/v1/content", auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const contents = await Content.find({ userId: req._id })
      .populate<{ tags: { _id: mongoose.Types.ObjectId; title: string }[] }>("tags", "title")
      .sort({ _id: -1 });

    res.status(200).json({ content: contents });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/v1/content/:id", auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Invalid content id" });
      return;
    }

    const result = await Content.deleteOne({ _id: req.params.id, userId: req._id });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Content not found" });
      return;
    }

    res.status(200).json({ message: "Content deleted" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/brain/share", auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const bodySchema = z.object({ share: z.boolean() });
    const parsed = bodySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Error in inputs", error: parsed.error.errors });
      return;
    }

    if (!parsed.data.share) {
      await Link.deleteOne({ userId: req._id });
      res.status(200).json({ message: "Sharing disabled" });
      return;
    }

    const existing = await Link.findOne({ userId: req._id });
    if (existing) {
      res.status(200).json({ hash: existing.hash });
      return;
    }

    const hash = crypto.randomBytes(8).toString("hex");
    await Link.create({ hash, userId: req._id });
    res.status(200).json({ hash });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/v1/brain/:shareLink", async (req: Request, res: Response) => {
  try {
    const link = await Link.findOne({ hash: req.params.shareLink });
    if (!link) {
      res.status(404).json({ message: "Invalid share link" });
      return;
    }

    const user = await User.findOne({ _id: link.userId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const contents = await Content.find({ userId: link.userId })
      .populate<{ tags: { _id: mongoose.Types.ObjectId; title: string }[] }>("tags", "title")
      .sort({ _id: -1 });

    res.status(200).json({ username: user.username, content: contents });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
