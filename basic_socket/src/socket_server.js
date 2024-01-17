const app = require("express");

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(socket, "socket is here...");
  socket.on("msg", (payload) => {
    console.log(payload, "io is here");
    io.emit("msg", payload);
  });
});

server.listen(4000, () => {
  console.log("Socket server is running...");
});
