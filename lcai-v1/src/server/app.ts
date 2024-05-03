// Set up configuration for the app without starting the server
import express from 'express';
import cors from 'cors';
import path from 'path';
import { routePaths } from './routes/routes.ts'; 
import { fileURLToPath } from 'url';
const app = express();
app.use(cors());
app.use(routePaths);

// Dynamically generate paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '/../../dist')));
export default app;

