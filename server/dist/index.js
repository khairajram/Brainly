var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "./db.js";
const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
console.log(`${process.env.PORT} ========== ${process.env.MONGO_URI}`);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
const app = express();
app.use(express.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
    const signupInput = z.object({
        username: z.string({
            required_error: "username is required",
            invalid_type_error: "username must be a string",
        })
            .min(3, { message: "Username must be 3 or more characters long" })
            .max(10, { message: "Username must not be more then 10 characters" })
            .trim(),
        password: z.string({
            required_error: "password is required",
            invalid_type_error: "password must be a string",
        })
            .min(8, { message: "password must be 8 or more characters long" })
            .max(20, { message: "password must not be more then 20 characters" })
            .trim()
            .regex(passwordValidation, {
            message: 'Your password is not valid',
        })
    });
    try {
        const isValid = signupInput.safeParse(req.body);
        if (!isValid.success) {
            return res.status(400).json({
                message: "Error in inputs",
                error: isValid.error.errors
            });
        }
        else {
            const hashedPassword = yield bcrypt.hash(isValid.data.password, 5);
            const dbResponse = yield User.create({
                username: isValid.data.username,
                password: hashedPassword
            });
            console.log(dbResponse);
            return res.status(200).json({
                message: "Signed up ",
                dbResponse
            });
        }
    }
    catch (e) {
        if (e.code === 11000) {
            return res.status(409).json({
                error: "Username already exists"
            });
        }
        return res.status(500).json({
            error: "internal Server error"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const signinInput = z.object({
        username: z.string({
            required_error: "username is required",
            invalid_type_error: "username must be a string",
        })
            .trim(),
        password: z.string({
            required_error: "password is required",
            invalid_type_error: "password must be a string",
        })
            .trim()
    });
    try {
        const isValid = signinInput.safeParse(req.body);
        if (!isValid.success) {
            res.status(411).json({
                message: "Error in inputs",
                error: isValid.error
            });
        }
        const dbResponse = yield User.findOne({
            username: req.body.username,
        });
        if (dbResponse === null) {
            return res.status(403).json({
                message: "user does not exist"
            });
        }
        const isPassCorrect = yield bcrypt.compare(req.body.password, dbResponse.password);
        if (!isPassCorrect) {
            return res.status(403).json({
                message: " Wrong password"
            });
        }
        const token = jwt.sign({
            username: dbResponse.username
        }, JWT_SECRET, {
            expiresIn: '1h'
        });
        res.status(200).json({
            message: 'Login successful',
            token
        });
    }
    catch (e) {
        return res.status(500).json({
            error: e.message || "Internal Server Error"
        });
    }
}));
app.post("/api/v1/content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
