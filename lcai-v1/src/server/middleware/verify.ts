// Source: https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2
import UserModel from "../models/User.js";
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { SECRET } from "../config/index.ts";
export async function Verify(req: Request, res: Response, next: any) {
    try {
        // Source: https://www.youtube.com/watch?v=mbsmsi7l3r4&t=717s
// Source: https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2
       const authHeader = req.headers['authorization'];
       const token = authHeader && authHeader.split(' ')[1];
       if (token == null) return res.sendStatus(401).json({message: "Authentication failed."});
       if (SECRET){
        jwt.verify(token, SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Authentication failed: Invalid or expired token."
                });
            }
            if (typeof decoded === 'object' && 'id' in decoded) {
                const userId = decoded.id as string;

            // Retrieve user details from the database using the decoded user ID
            const user = await UserModel.findById(userId).select("-password");
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
            req.user = user;
        }
        });
        
       }
 
       
    }catch (err) {
        console.error("Verification error:", err);
        res.status(500).json({
            message: "Internal server error during authentication."
        });
    }
}