// Defining and creating a schema https://mongoosejs.com/docs/guide.html#definition
//Source: https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2

import mongoose from "mongoose";
// Import secret access token
import { SECRET } from "../config/index.ts";
import jwt from 'jsonwebtoken';


const { Schema } = mongoose;

interface InterfaceVideo {
   photoFilePath: string;
   videoFilePath?: string;
   audioFilePath?: string;
}
const VideoSchema = new Schema<InterfaceVideo>({

   photoFilePath: {
      type: String,
      required: true
   },
   videoFilePath:
   {
      type: String,
      required: false
   },
   audioFilePath:
   {
      type: String,
      required: false
   },




})

interface InterfaceUserModel extends mongoose.Model<InterfaceUserDocument> {
   generateAccessJWT(): string;
}

interface InterfaceUserDocument extends mongoose.Document {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   videos?: InterfaceVideo[];
   generateAccessJWT(): string;
}
const userSchema = new Schema<InterfaceUserDocument, InterfaceUserModel>({
   firstName:
   {
      type: String,
      required: true
   },
   lastName:
   {
      type: String,
      required: true
   },
   email:
   {
      type: String,
      required: true
   },

   password:
   {
      type: String,
      required: true
   },


   videos:
   {
      type: [VideoSchema],
      required: false
   }



}, { timestamps: true });

//Source: https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2
userSchema.methods.generateAccessJWT = function () {
   let payload = {
      id: this._id,
   };
   return jwt.sign(payload, SECRET!, {
      expiresIn: '1h',
   });
};

const UserModel = mongoose.model("User", userSchema)

export default UserModel; 
