const { Server } = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const config = require("./config/config");
const app = require("./app");
const logger = require("./config/logger");
// remove cors issue

let server;
// connect mongoose
mongoose.connect(config.mongoose.url).then(() => {
  logger.info("Connected to MongoDB");
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // or specify frontend URL
    methods: ["GET", "POST"],
  },
});
// ✅ Handle Socket Connections temperary set
io.on("connection", (socket) => {
  logger.info(`⚡ New client connected: ${socket.id}`);

  // Example: Chat message
  socket.on("chat message", (msg) => {
    logger.info(`Message received: ${msg}`);
    io.emit("chat message", msg); // broadcast to all clients
  });

  // Example: Like event
  socket.on("like post", (data) => {
    logger.info(`Post liked: ${JSON.stringify(data)}`);
    io.emit("like post", data); // notify all users
  });

  // Disconnect
  socket.on("disconnect", () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});
// server running here
server = httpServer.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};
const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
