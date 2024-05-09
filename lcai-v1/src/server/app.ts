// Set up configuration for the app without starting the server
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import {registerUser, loginUser, Logout, greetUser, updatePassword} from './controllers/userController.js';
import cookieParser from "cookie-parser";
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
app.post("/api/dashboard", greetUser);
app.post("/api/updatePassword", updatePassword)


// Single page application with single entry point (routes handled by client-side), redirects to home page
// when user makes a get request to '/register' for example 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..','..', 'dist', 'index.html'));
});



export default app;



