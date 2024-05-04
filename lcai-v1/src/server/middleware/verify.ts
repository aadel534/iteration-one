// https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2
import UserModel from "../models/User.js";
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { SECRET } from "../config/index.ts";
import { config } from "dotenv";
export async function Verify(req: Request, res: Response, next: any) {
    try {
        // Get the session cookie from the request header identifying the user
        const authHeader = req.headers["cookie"];
        // if there is no cookie from the request header, the user is unauthorized...send the response
        if (!authHeader) return res.sendStatus(401);
        // If there is a cookie from the request header, split the cookie string to retrieve the jwt (jsonwebtoken)
        const cookie = authHeader.split("=")[1];

        // Check if the token has been tampered with or if it has expired/check cookie's integrity
        jwt.verify(cookie, SECRET!, async (err: any, decoded: any) => {
            if (err) {
                return res
                    .status(401) //if token altered or expired, it is unauthorised
                    .json({ message: "This session has expired. Please log in again!" })
            }

            // Get user id when thte token is decoded
            const { id } = decoded;
            // Find the user in the database according to id without including the password
            const user = await UserModel.findById(id).select("-password");
            if (!user) {
                // No user found with this ID
                return res.status(404).json({ message: "User not found" });
            }
            // Put he data object into req.user
            req.user = user.toObject({ versionKey: false });
            next();
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal server error",
        })
    }
}