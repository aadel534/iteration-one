import express from "express";
import ViteExpress from "vite-express";
import { fileURLToPath } from "url";
import cors from "cors";
import mongoose from "mongoose";
import UserModel from "./models/User.js";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());

// app.post("/register", (req, res) => {
//   UserModel.create(req.body)
//   .then(user => res.json(users))
//   .catch(err => res.json(err))
// })

// app.post("/register", async (req, res) => {
//   const { forename, surname, email, password, passwordConfirmation } = req.body;
//   // Secure password storage https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in-nodejs/
//   const userExists = await UserModel.findOne({ email });
//   if (userExists) {
//     return res
//       .status(400)
//       .json({ message: "An account already exists with this email!!" });
//   } else {
//     const saltRounds: number = 10;
//     let passwordHash = "";
//     bcrypt.genSalt(saltRounds, (err, salt) => {
//       if (err) {
//         return;
//       }
//       bcrypt.hash(password, salt, (err, hash) => {
//         if (err) {
//           console.log("Error hashing password.");
//           return;
//         } else {
//           console.log("Hashed password: ", hash);
//           passwordHash = hash;
//         }
//       });
//     });

//     const User = await UserModel.create({
//       firstName: forename,
//       lastName: surname,
//       email: email,
//       password: passwordHash,
        
//     }
//     );
//     try {
//       User.save();
//       res.status(201).json({ message: "User registered successfully" });
//     } catch (err) {
//       res.status(500).json({ message: "Failed to register user", error: err });
//     }

//   }
  
// });

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
