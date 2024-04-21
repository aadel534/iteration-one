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

app.post(
  "/register",
  (req, res) => {
    const { forename, surname, email, password, passwordConfirmation } =
      req.body;
    // Secure password storage https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in-nodejs/
    const saltRounds:number = 10;
    let passwordHash = "";
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err){
        return;
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.log("Error hashing password.");
          return;
        }
        else
        {
          console.log("Hashed password: ", hash);
          passwordHash = hash;
        }

      });
    });
   

    const User = UserModel.create({
      firstName: forename,
      lastName: surname,
      email: email,
      password: passwordHash
    });
  }
  // _id: Schema.Types.ObjectId,
  // firstName: String,
  // lastName: String,
  // email: String,
  // password: String,
  // createdAt: Date.now,
  // videos: [VideoSchema]
);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
