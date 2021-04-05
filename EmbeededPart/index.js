const express = require("express");
const cors = require('cors');
const socket = require("socket.io");

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});


// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server,   {
  cors: {
    origins: '*:*',
    methods: ["GET", "POST"]
  },
});

var users = new Object();

io.on("connection", function (socket) {
  console.log("Made socket connection");
  var id = socket.id
  users[id] = socket.handshake.query.id;
  if(socket.handshake.query.id === "browser") {
    if(Object.keys(users).length >= 2) {
      io.to(id).emit("status", "Connected");
    }

  }
  if(socket.handshake.query.id === "esp") {
    if(Object.keys(users).length >= 2) {
      socket.broadcast.emit("status", "connected"); // world
    }

  }

  app.get('/test',(req,res) => {
    res.sendFile('app.html');
  });
  socket.on("measure", () => {
    socket.broadcast.emit("heart", null); // world
  });

  socket.on("reply_Heart", (arg) => {
    socket.broadcast.emit("reply_heart_front", arg);
  });


  socket.on("measureTemp", () => {
    socket.broadcast.emit("temp", null); // world
  });

  socket.on("reply_Temp", (arg) => {
    socket.broadcast.emit("reply_temp_front", arg);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
    var id = socket.id;
    if(users[id] === "esp") {
      socket.broadcast.emit("status", "Not Connected");
    }
    delete users[id];
    console.log(users);
  });

});