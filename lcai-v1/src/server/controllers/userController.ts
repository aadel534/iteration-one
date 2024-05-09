import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';
import { emailRegex } from '../utils/emailValidator.js';
import { Request, Response } from 'express';
import Blacklist from '../models/Blacklist.ts';
import {SECRET} from '../config/index.ts';
// Source: https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2
export async function loginUser (req: Request, res: Response) {
  const { email, password } = req.body;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "That is not a valid email address." });
  }
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all of the fields!" });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: "Passwords must have a length of 8 or greater." });
  }
  const userExists = await UserModel.findOne({ email });
  if (!userExists) {
    return res.status(404).json({ message: "There is no user registered with this account." });
  }
  else {
    const userDetailsCorrect = await bcrypt.compare(password, userExists.password);
    if (userDetailsCorrect) {

      // Generate session token for user
      const token = userExists.generateAccessJWT();
      let day = 24 * 60 * 60 * 1000;
      // Set the token response header
      // Source: https://pankaj-kumar.medium.com/how-to-handle-cookies-in-node-js-express-app-b16a5456fbe0
      res.cookie("SessionID", token, {
        maxAge: day,
        httpOnly:true,
        path: "/"
    });
    

      return res.status(200).json({ message: "Logging in...", userId: userExists.id });
      // https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2

    }
    else {
      return res.status(401).json({ message: "Incorrect password." });
    }
  };
} 

export async function registerUser(req: Request, res: Response) {
  const { forename, surname, email, password, passwordConfirmation } = req.body;
  // Secure password storage https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in-nodejs/
  if (!forename || !surname || !email || !password || !passwordConfirmation) {
    return res.status(400).json({ message: "Please fill all of the fields!" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "That is not a valid email address." });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Passwords must have a length of 8 or greater." });
  }

  if (password !== passwordConfirmation) {
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  // Check if user already exists
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "An account already exists with this email!" });
  } else {
    if (password == passwordConfirmation) {
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const newUser = new UserModel({
        firstName: forename,
        lastName: surname,
        email: email,
        password: passwordHash
      });
      await newUser.save();

    }
    else {
      return res.status(400).json({ message: "Passwords do not match!" });

    }

  };
}

// https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2
export async function Logout(req: Request, res: Response) {
  try {
        // Retrieve session cookie from request header
        const authHeader = req.headers['cookie'];
        // If there's no content
        if (!authHeader) return res.sendStatus(204);
        // If there is content, split the cookie string and retrieve jwt token
        const cookie = authHeader.split('=')[1];
        const accessToken = cookie.split(";")[0];
        // check if token is blacklisted
        const checkIfBlacklisted = await Blacklist.findOne({token: accessToken});
        if (checkIfBlacklisted) return res.sendStatus(204);
        // Blacklist token if it's not blacklisted 
        const newBlackList = new Blacklist({
          token: accessToken,
        });
        await newBlackList.save();
      // Clear request cookie on client
      res.setHeader("Clear-Site-Data", "cookies");
      res.status(200).json({message: "You are logged out!"});
    
  }
  catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
  res.end();
}

export async function greetUser (req: Request, res: Response) { 
  const { userId } = req.body;
  const user = await UserModel.findOne({ userId });
  if (user) {
    const firstName = user?.firstName;
    res.status(200).json({firstName});
  }
  else 
  {
    res.status(404).json({status: "error", message: "Error finding user details..."})
  }


}

export async function updatePassword(req: Request, res: Response) {
  const {password, userId} = req.body;
  const user = await UserModel.findOne({userId});
  if (user) {
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    await user.updateOne({password: passwordHash});
    const message = "Password updated";
  
    res.status(200).json({message});

  }

}