import app from './app.js';
import { PORT, URI } from './config/index.ts';
// creating a secure server
import { createServer } from 'https';
// Real-time communication
import { Socket, Server } from 'socket.io';
// for mongodb
import mongoose from 'mongoose';


// Source: https://stackoverflow.com/questions/11744975/enabling-https-on-express-js
// to read ssl certificate files
import { readFileSync } from 'fs';
// key and certificate for https 
const sslOptions = {
  key: readFileSync("/Users/adelayoadebiyi/Documents/GitHub/iteration-one/certificates/localhost.key"),
  cert: readFileSync("/Users/adelayoadebiyi/Documents/GitHub/iteration-one/certificates/localhost.cert")
};
const httpsServer = createServer(sslOptions, app);

// Source: https://socket.io/docs/v4/server-initialization/
const io = new Server(httpsServer,
  {
    cors: {
      origin: "https://localhost:3000",
      methods: ["GET", "POST"],
    },
  }
);

io.on("connection", (socket: Socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  })
});
// connecting to the database
if (typeof URI !== 'string') {
  throw new Error('Database URI is undefined.');
}
// Source: https://mongoosejs.com/docs/connections.html
mongoose.connect(URI)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed to connect");
  });

  // Source: https://nodejs.org/api/https.html#serverlisten
// start server
httpsServer.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});