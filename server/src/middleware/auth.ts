import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
  _id?: string;
}

export function auth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(500).json({ message: "JWT_SECRET is not configured on the server" });
      return;
    }

    const header = req.headers.authorization;
    if (!header) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : header;

    const decoded = jwt.verify(token, secret);

    req._id = (decoded as jwt.JwtPayload)._id;

    next();
  } catch (error) {
    res.status(403).json({ message: "Unauthorized: Invalid token" });
    return;
  }
}
