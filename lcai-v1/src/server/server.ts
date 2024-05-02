// Import the Express application and configure the HTTP server startup
import app from './app.js';
import {PORT, URI} from './config/index.ts';
import { createServer } from 'http';
import { Socket, Server } from 'socket.io';
import mongoose from 'mongoose';

const httpServer = createServer(app);
const io = new Server(httpServer,
  {
    cors: {
      origin: "http://localhost:3000",
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


httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });