// Defining and creating a schema https://mongoosejs.com/docs/guide.html#definition

import mongoose from "mongoose";
// import jwt from 'jsonwebtoken';
// import {SECRET_ACCESS_TOKEN} from '../middleware/verify.js';


const {Schema} = mongoose;

const VideoSchema = new Schema ({

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

const userSchema = new Schema({
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

// userSchema.methods.generateAccessJWT = function () {
//    let payload = {
//       id: this._id,
//    };
//    return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
//       expiresIn: '20m',
//    });
// };

const UserModel = mongoose.model("User", userSchema)

export default UserModel; 
