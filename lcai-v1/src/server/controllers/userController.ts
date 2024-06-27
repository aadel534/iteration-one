import UserModel from '../models/User.js';
// For password encryption
import bcrypt from 'bcrypt';
import { emailRegex } from '../utils/emailValidator.js';
import { Request, Response } from 'express';
// For session expiry
import Blacklist from '../models/Blacklist.ts';

// Source Mongoosejs.com documentation



// Source: https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2
export async function loginUser(req: Request, res: Response) {
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
    // Source: // https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2

    const userDetailsCorrect = await bcrypt.compare(password, userExists.password);
    if (userDetailsCorrect) {

      // Generate session token for user
      const token = userExists.generateAccessJWT();
      let day = 24 * 60 * 60 * 1000;
      // Set the token response header
      // Source: https://pankaj-kumar.medium.com/how-to-handle-cookies-in-node-js-express-app-b16a5456fbe0
      res.cookie("SessionID", token, {
        maxAge: day,
        httpOnly: true,
        // using https
        secure: true,
        sameSite: "strict",
      });



      return res.status(200).json({ message: "Logging in...", userIdResponse: userExists.id });
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
    // Source: https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2

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
      res.status(200).json({ message: "You are registered!" });

    }
    else {
      return res.status(400).json({ message: "Passwords do not match!" });

    }

  };
}

// https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2
export async function logout(req: Request, res: Response) {
  try {
    // Retrieve session cookie from request header
    const accessToken = req.cookies.SessionID;
    if (!accessToken) return res.sendStatus(204);
    // If there is content, split the cookie string and retrieve jwt token
    // check if token is blacklisted
    const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken });
    if (checkIfBlacklisted) return res.sendStatus(204);
    //else nlacklist token if it's not already blacklisted
    const newBlackList = new Blacklist({
      token: accessToken,
    });
    await newBlackList.save();
    // Clear request cookie on client
    res.cookie('SessionID', '', {
      httpOnly: true,
      secure: true,   
      sameSite: 'strict', 
      maxAge: 0,

    });

  console.log
    res.status(200).json({ message: "You are logged out!" });

  }
  catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
  res.end();
}
export async function greetUser(req: Request, res: Response) {
  const { userId } = req.body;
  console.log('Fetching user details for:', userId);
  const user = await UserModel.findById(userId);
  
  if (!user) {
    console.log('User not found:', userId);
    return res.status(404).json({ message: "User not found." });
  }

  console.log('User found:', user.firstName);
  res.status(200).json({ firstName: user.firstName });
}

export async function updatePassword(req: Request, res: Response) {
  const { oldPassword, newPassword, userId } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Please provide both old and new passwords." });
  }
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: `User not found. ${userId}` });
  }

  const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
  if (!isOldPasswordCorrect) {
    return res.status(401).json({ message: "Old password is incorrect." });
  }

  const saltRounds = 12;
  const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
  await user.updateOne({ password: newPasswordHash });
  res.status(200).json({ message: "Password updated successfully." });
}


export async function deleteAccount(req: Request, res: Response) {
  const { oldPassword, userId } = req.body;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: `User not found. ${userId}` });
  }

  const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
  if (!isOldPasswordCorrect) {
    return res.status(401).json({ message: "Old password is incorrect." });
  }
  try {
    await UserModel.findByIdAndDelete(userId);
    res.status(200).json({ message: "Account deleted successfully." });
  }
  catch {
    res.status(200).json({ message: "Error deleting account." });

  }
}
