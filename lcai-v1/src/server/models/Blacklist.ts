import mongoose from "mongoose";
// Source: https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2
// Source Mongoosejs.com documentation

const BlacklistSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            ref: "User",
        },
    },
    { timestamps: true }
);
export default mongoose.model("blacklist", BlacklistSchema);