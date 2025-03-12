import jwt from "jsonwebtoken";
import { Request, Response, NextFunction  } from "express";
import { string } from "zod";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

interface AuthenticatedRequest extends Request {
  _id?: string;
}

export  function auth(req : AuthenticatedRequest,res : Response,next : NextFunction){
  try {
    const token : string | undefined  = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token as string, JWT_SECRET as string);

    req._id = (decoded as jwt.JwtPayload)._id;
    
    next();
  } catch (error) {
    res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
}