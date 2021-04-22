'use strict';

const cors = require('cors');
const socket = require("socket.io");

require('dotenv').config()
const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;
 
const Token= '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCSIweI7uFzB07K\nRlH+Wo5bqiT2Tx/Jql18JxWJ7+pOWfbLU2mA8aFqOzyOZjmt1Mt0OJnaDgQPEJCU\nNcB0D4AozvSPXgNdUrAJzHTef/mUCEw319B4gjs98uRCncSrMuvIWUKf+K1uEmU1\n9SHQLiLyTty3EVvrEeE0A7ewioP+lrXKzGmF7UCImExRVaUL7w8mFQCt5l80r3ha\neknZ35YWP+O4fv4ZtOEs0HEvgK5j/U76YUJWUTGHChTG1+4opeZm7PB5ASWfC3y/\noov+++c90Ti2BehFr6iS+F55ApPcLyezWIx7oO3lyOY8as5iBOYfh/pAY3ozxj0R\nmLEOCgdvAgMBAAECggEAAh0yCuxu5BF2o2ZS4cKXv53dkXLmS1LE0nGbuqiboVYb\nsagEnA/ZppPWqBGQFZ4KO7fSwWFuqyuxiE/rnAbH8zPAYT0jbglBHkIG/6S5A361\nzmncMPoZ5N4HBAbVid3opJNB/daXCx6rJgNSKtThLGYMX8cHS70w+gqVJ59vEhv3\nbwqx0469AqWonbD0BhgrML9oMm8OFaIIImszAxMKCxkHg7HjcYx1a6qos5ZVKAMw\nMeeHtRtPsUy0MN0Q6Z5qaYGS8t5tCQuZkh4p3+ffP+ZScUegv8JLDfMVNCXFkNAo\nfrd5Hi5MKSfBkzeeU+cFwmm+027LYy757dX/D0MQuQKBgQDFp7MiiupOs2/KQttA\ng7y6DRmnARthl6SAaCExQeeTONWVMCoeYrIDNe17pXFltlnrJ/nAvP39qcec88tH\n7SbKmUUG/JkXRufCsZQ1CXbgILNywBo2bDFqpPtevD5vzB5BK6MEeGSn8NwbIS11\nynMePZCnZQ6nVeLDxSokLQAJGQKBgQC9RjmKufoD/l46rSLFOb3qJyalV+ZCCFNq\nn3UokRa0O3Ws3Sn1/UgnvjL1tEokCSP19LG2d4xFHaFEgIblCirfaq1m3mGQFAnK\n6TsvRDP1wkre98+kqxiIWf+ehnDIE/9/UbGuED0WaDVKN3tXrg9uqGlc1ojtuHgv\n2HBkOpg9xwKBgQCzWGl4rGfSpYqIEoXzUhXLE9v051I7CWfgg5uqoExKD8XtKtjs\n3Uz9EM+94+6zBfUtJQa/1jz5EDbpuWT4jL0oFE7H+ifHMTVWOd9rCH1u/P0W4Cxo\nuV9VjwHvggt9Uc8Z/0hZ5AwhPrHZhA9F1D8Eb4Rz/4R+XbX3QU3tqU9g8QKBgAhA\nTHfgvaZ461CxhYeFieLwS/3/Q/ly9Xf7dZcMJCo9QVcE2TRxEzkwUHZnoqfJgjjR\nrwGeWo4UyZf75mWLuOy+cMrAPQ6T4Q1od30LAxzemHb55KJwFwSyr7MQd1AxlvzM\n6esFqDQW3OPcYVMkMmYHj3hNnfCHDy4+yD+GUma3AoGABOBqmPoVoPUvp4tJB7z5\nlbRlp3/q39yt9C+GYkBLeRH6vK8MqefhpxzmsieF0dY9nSZgSXOj21VwLRUdqr0a\nFMdN6u8WVw0hLxvFsXjaBlSaFJ+dBsvE00+ANt06yeu8cOtg5zeML0cn2m1gQ0xB\nOsEAXTOZaNFOHzCI/sqqZgY=\n-----END PRIVATE KEY-----\n'

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
