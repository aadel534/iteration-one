// Defining and creating a schema https://mongoosejs.com/docs/guide.html#definition

import mongoose from "mongoose";
const {Schema} = mongoose;

const VideoSchema = new Schema ({
   _id: Schema.Types.ObjectId,
   photoFilePath: String,
   videoFilePath: String,
   audioFilePath: String,
   createdAt: Date.now

   
})

const userSchema = new Schema({
   _id: Schema.Types.ObjectId,
   firstName: String,
   lastName: String,
   email: String,
   password: String,
   createdAt: Date.now,
   videos: [VideoSchema]



})

const UserModel = mongoose.model("user", userSchema)

export default UserModel; 
