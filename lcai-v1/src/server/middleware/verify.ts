// Source: https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2
import UserModel from "../models/User.js";
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { SECRET } from "../config/index.ts";
export async function Verify(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.SessionID;
    if (!token) {
        return res.status(401).json({ message: "Authentication failed: No token provided." });
    }
    if (!SECRET){
      return res.status(500).json({ message: "Internal Server Error: Secret key not set." });

    }
    jwt.verify(token, SECRET, async (err:any, decoded:any) => {
        if (err) {
            return res.status(401).json({
                message: "Authentication failed: Invalid or expired token."
            });
        }
        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            const user = await UserModel.findById(decoded.id).select("-password");
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
            req.user = user;
            next();
        } else {
            res.status(401).json({ message: "Invalid token payload." });
        }
    });

}
