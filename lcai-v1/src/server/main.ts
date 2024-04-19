import express from "express";
import ViteExpress from "vite-express";
import { fileURLToPath } from "url";
import cors from "cors";
const app = express();
app.use(cors());



ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
