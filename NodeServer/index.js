'use strict';

const cors = require('cors');
const socket = require("socket.io");
const {PythonShell} =require('python-shell');

require('dotenv').config()
const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;
 

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});
/*
const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});
*/
const apiai = require('apiai')(Token);

// Web UI
app.get('/', (req, res) => {
  res.sendFile('index.html');
});


// Socket setup
const io = socket(server, {
  cors: {
    origins: '*:*',
    methods: ["GET", "POST"]
  },
});

var users = new Object();

//////////////model_integration///////////////////:

var Xnew = '1,1,1,1,1,0,1,1,1,1,0,1,0,0,0,0,0,1,0,1,0,0,0';

let options = {
  mode: 'text',
  //pythonOptions: ['-u'], // get print results in real-time
  pythonPath: 'C:/Users/ali/Desktop/MarvinBot/NodeServer/venv/Scripts/python', //If you are having python_test.py script in same folder, then it's optional.
  args: [Xnew] //An argument which can be accessed in the script using sys.argv[1]
};

PythonShell.run('model.py', options, function (err, result){
  if (err) throw err;
  // result is an array consisting of messages collected 
  //during execution of script.
  console.log('result: ', result.toString());
 
});

////////////////////////////////////////

io.on('connection', function(socket) {
  socket.on('chat message', (text) => {
    console.log('Message: ' + text);

    // Get a reply from API.ai

    let apiaiReq = apiai.textRequest(text, {
      sessionId: APIAI_SESSION_ID
    });

    apiaiReq.on('response', (response) => {
      let aiText = response.result.fulfillment.speech;
      console.log('Bot reply: ' + aiText);
      socket.emit('bot reply', aiText);
    });

    apiaiReq.on('error', (error) => {
      console.log(error);
    });

    apiaiReq.end();

  });

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
