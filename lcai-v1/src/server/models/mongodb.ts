// Defining and creating a schema https://mongoosejs.com/docs/guide.html#definition

import mongoose from "mongoose";



const {Schema} = mongoose;

const VideoSchema = new Schema ({
   _id: {
      type: Schema.Types.ObjectId,
   },
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
   
   createdAt:
   {
      type: Date,
      required: true
   } 
   
   
})

const userSchema = new Schema({

   _id: 
   {
      type: Schema.Types.ObjectId,
      required: true
   },
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

   createdAt: 
   {
      type: Date,
      required: true
   },
   videos:
   {
      type: [VideoSchema],
      required: false
   }



})

const UserModel = mongoose.model("User", userSchema)

export default UserModel; 
