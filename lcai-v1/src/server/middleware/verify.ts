// // https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2
// import UserModel from "../models/User.js";
// import jwt from "jsonwebtoken";
// export async function Verify(req, res, next)
// {
//     try {
//         // Get the session cookie from the request header identifying the user
//         const authHeader = req.headers["cookie"];
//         // if there is no cookie from the request header, the user is unauthorized...send the response
//         if (!authHeader) return res.sendStatus(401);
//         // If there is a cookie from the request header, split the cookie string to retrieve the jwt (jsonwebtoken)
//         const cookie = authHeader.split("=")[1];

//         // Check if the token has been tampered with or if it has expired/check cookie's integrity
//         jwt.verify(cookie, config.SECRET_ACCESS_TOKEN, async (err, decoded) => {
//             if (err) {
//                 return res
//                 .status(401) //if token altered or expired, it is unauthorised
//                 .json({message: "This session has expired. Please log in again!"})
//             }
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: "error",
//             code: 500,
//             data: [],
//             message: "Internal server error",
//         })
//     }
// }