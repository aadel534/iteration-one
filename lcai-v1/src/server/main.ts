import express from "express";
// import ViteExpress from "vite-express";
// import { fileURLToPath } from "url";
import cors from "cors";
import mongoose from "mongoose";
import UserModel from "./models/mongodb.js";
import bcrypt from "bcrypt";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
app.use(cors());
app.use(express.json());
import path from 'path';
import { fileURLToPath } from "url";

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' http://localhost:8080;");
  next();
});
app.use(express.static('/Users/adelayoadebiyi/Documents/GitHub/iteration-one/lcai-v1/dist'));



const httpServer = createServer(app);
const io = new Server (
  {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },

  }
);

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
  console.log("User disconnected");
  })
})



mongoose.connect("mongodb+srv://Adelayo:123@lcai.jurezce.mongodb.net/?retryWrites=true&w=majority&appName=lcai")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed to connect");
  });

app.get('/', (req, res) => {
  res.sendFile(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist', 'index.html'));

})

app.post("/api/register", async (req, res) => {
  const { forename, surname, email, password, passwordConfirmation } = req.body;
  // Secure password storage https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in-nodejs/
  if (!forename || !surname || !email || !password || !passwordConfirmation) {
    return res.status(400).json({ message: "Please fill all of the fields!" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
});

// Vite assets must be served (front-end dev)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

const PORT = 8080;
httpServer.listen( PORT, () => {
    console.log(`Server running on http://localhots:${PORT}`);
  });