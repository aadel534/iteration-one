import {registerUser, loginUser} from '../controllers/userController.js';
import app from "../app.js";
import path from "path";

export function routePaths() {

app.post("/api/login", loginUser);

app.post("/api/register", registerUser);

// Single page application with single entry point (routes handled by client-side), redirects to home page
// when user makes a get request to '/register' for example 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..','..', 'dist', 'index.html'));
});

}