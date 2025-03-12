import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import  { any, number, string, z } from "zod";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { auth } from "./middleware/auth.js";

import { Tag,Content,User,Link } from "./db.js"

const PORT: number = parseInt(process.env.PORT || "3000");
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

console.log(`${process.env.PORT} ========== ${process.env.MONGO_URI}`);

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));


const app = express();

app.use(express.json());

interface signupType {
  "username": string,
  "password": string
}


app.post("/api/v1/signup", async (req: any, res: any) => {
  const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );
  const signupInput = z.object({
    username : z.string({
                          required_error: "username is required",
                          invalid_type_error: "username must be a string",
                        })
                .min(3,{ message: "Username must be 3 or more characters long" })
                .max(10,{ message: "Username must not be more then 10 characters" })
                .trim(),
    password : z.string({
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

  try{
    const isValid = signupInput.safeParse(req.body);
    
    if (!isValid.success) {
        return res.status(400).json({
            message: "Error in inputs",
            error: isValid.error.errors
        });
    }else{
      const hashedPassword = await bcrypt.hash(isValid.data.password,5);
      const dbResponse = await User.create({
        username : isValid.data.username,
        password : hashedPassword
      });
      console.log(dbResponse);
      return res.status(200).json({
        message: "Signed up ",
        dbResponse
    });
    }
  }catch (e : any){
    if (e.code === 11000) {
      return res.status(409).json({
          error: "Username already exists"
      });
    }
  
    return res.status(500).json({
      error: "internal Server error"
    })
  }

} )



app.post("/api/v1/signin",async (req: any, res: any) => {
  const signinInput = z.object({
    username : z.string({
                          required_error: "username is required",
                          invalid_type_error: "username must be a string",
                        })
                .trim(),
    password : z.string({
                          required_error: "password is required",
                          invalid_type_error: "password must be a string",
                        })
                .trim()
  });

  type ReqType = z.infer<typeof signinInput>;
  
  try{
    const isValid = signinInput.safeParse(req.body);
    if (!isValid.success) {
        res.status(411).json({
            message: "Error in inputs",
            error: isValid.error
        });
    }

    const dbResponse : ReqType & { _id : string } | null = await User.findOne({
      username : req.body.username,
    });

    if(dbResponse === null){
      return res.status(403).json({
        message : "user does not exist"
      })
    }

    const isPassCorrect = await bcrypt.compare(req.body.password,dbResponse.password);

    if(!isPassCorrect){
      return res.status(403).json({
        message : " Wrong password"
      })
    }

    const token = jwt.sign({
      _id : dbResponse._id
    },JWT_SECRET as string,{
      expiresIn : '1h'
    });

    res.status(200).json({ 
      message: 'Login successful',
      token
    });

  }catch (e : any){
    return res.status(500).json({
      error: e.message || "Internal Server Error"
    })
  }

})

interface AuthenticatedRequest extends Request {
  _id?: string;
}

app.post("/api/v1/content",auth,async (req : AuthenticatedRequest,res : Response) => {

  const contentInput = z.object({
    link : z.string({required_error: "title is required",}).url({ message: "Invalid url" }),
    type : z.enum(['image','video','article','audio']),
    title : z.string({
                          required_error: "title is required",
                          invalid_type_error: "title must be a string",
                        })
                .trim(),
    tags : z.string({
                      required_error: "tags is required",
                      invalid_type_error: "tags must be a string",
                    })
              .trim(),
  });

  try{
    const isValid = contentInput.safeParse(req.body);

    if(!isValid.success){
      res.status(400).json({
        message: "Error in inputs",
        error: isValid.error.errors
      });
      return;
    }else{
      type dbStrContent = z.infer<typeof contentInput>;

      const dbResponse : dbStrContent | null = await Content.create({
        type : isValid.data.type,
        link : isValid.data.link,
        title : isValid.data.link,
        tags : isValid.data.tags,
      });

      if(dbResponse === null){
        res.status(403).json({
          message : "user does not exist"
        });
        return;
      }

    }




  }catch(e){
    return res.status(500).json({
      message : "error"
    })
  }


})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
