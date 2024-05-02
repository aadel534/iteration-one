import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';
import { emailRegex } from '../utils/emailValidator.js';
import { Request, Response } from 'express';


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
      return res.status(200).json({ message: "Logging in..." });
      // Generating tokens for login/logout
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