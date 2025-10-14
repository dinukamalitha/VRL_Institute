import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {ENV} from "../config/env";

const JWT_SECRET = ENV.JWT_SECRET || "supersecret";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        (req as any).user = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};
