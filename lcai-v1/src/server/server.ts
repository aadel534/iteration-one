import app from './app.js';
import {PORT, URI} from './config/index.ts';
import { createServer } from 'https';
import { Socket, Server } from 'socket.io';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';



import { readFileSync } from 'fs';

const sslOptions = {
  key: readFileSync("/Users/adelayoadebiyi/Documents/GitHub/iteration-one/certificates/localhost.key"),
  cert: readFileSync("/Users/adelayoadebiyi/Documents/GitHub/iteration-one/certificates/localhost.cert")
};


const httpsServer = createServer(sslOptions, app);
const io = new Server(httpsServer,
  {
    cors: {
      origin: "https://localhost:3000",
      methods: ["GET", "POST"],
    },
  }
);

io.on("connection", (socket: Socket ) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  })
});
if (typeof URI !== 'string') {
  throw new Error('Database URI is undefined.');
}

mongoose.connect(URI)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed to connect");
  });


httpsServer.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
  });