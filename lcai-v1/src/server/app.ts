import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import {registerUser, loginUser, Logout, greetUser, updatePassword, deleteAccount} from './controllers/userController.ts';
import cookieParser from "cookie-parser";
import { Request, Response } from 'express';

import { exec } from 'child_process';
import path from 'path';
import { Verify } from './middleware/verify.ts';
const app = express();
// Enable cookies with origin and credentials ---> Source: https://stackoverflow.com/questions/53787770/res-cookie-not-setting-cookie-in-browser
app.use(cors({origin: "http://localhost:3000", credentials:true}));
app.use(express.json());
app.use(cookieParser())


// Dynamically generate paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '/../../dist')));



app.post("/api/login", loginUser);

app.post("/api/register", registerUser);
app.post("/api/dashboard", Verify, greetUser);
app.post("/api/changepassword", Verify, updatePassword)
app.post("/api/deleteAccount",  Verify, deleteAccount)
app.get("/api/logout", Logout);


app.post('/api/start_emotion_recognition', (req: Request, res: Response) => {
  const scriptPath = "/Users/adelayoadebiyi/Documents/GitHub/iteration-one/lcai-v1/public/ai_models/face_recog/emotion_recognition.py";
    //   Source: https://stackoverflow.com/questions/73408125/trying-to-run-a-python-script-from-nodejs-and-cant-figure-out-the-argument-list
    // Execute python script from express
  exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
          console.error(`Error: ${error.message}`);
          return res.status(500).json({ error: error.message });
      }
      if (stderr) {
          console.error(`Stderr: ${stderr}`);
          return res.status(500).json({ error: stderr });
      }
      console.log(`Stdout: ${stdout}`);
      res.json({ status: 'success', output: stdout });
  });
});

// Single page application with single entry point (routes handled by client-side), redirects to home page
// when user makes a get request to '/register' for example 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..','..', 'dist', 'index.html'));
});



export default app;



