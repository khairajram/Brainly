import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export interface AuthenticatedRequest extends Request {
  _id?: string;
}

export function auth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : header;

    const decoded = jwt.verify(token, JWT_SECRET as string);

    req._id = (decoded as jwt.JwtPayload)._id;

    next();
  } catch (error) {
    res.status(403).json({ message: "Unauthorized: Invalid token" });
    return;
  }
}
