import express from "express";
import ViteExpress from "vite-express";
import { fileURLToPath } from "url";

const app = express();

app.get("/register", (req, res) => {
  const filePath = fileURLToPath(
    new URL(
      "/Users/adelayoadebiyi/Documents/Documents/FYP/iteration-one/lcai-v1/src/client/Register/index.html",
      import.meta.url
    )
  );
  res.sendFile(filePath);
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
