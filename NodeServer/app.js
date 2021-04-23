var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const app = express();
const data = require('../mylogreg.json');
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(express.json());
app.use(cors());

const db = require("./models");
const Role = db.role;


var mongoose = require('mongoose');
var configDB = require('./config/db.config.json');

var userRouter = require('./routes/user.routes');
var forumRouter = require('./routes/forum.routes');
var chatRouter = require('./routes/chat.routes');
var diagnostiqueRouter = require('./routes/diagnostique.routes');

var authRouter = require('./routes/auth.routes');
var hospitalRouter = require('./routes/hospital.routes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/user', userRouter);
app.use('/forum', forumRouter);
app.use('/chat', chatRouter);
app.use('/diagnostique', diagnostiqueRouter);
app.use('/haha', authRouter);
app.use('/hospital', hospitalRouter);


const connect = mongoose.connect(
  configDB.mongo.uri,
  {     
    useNewUrlParser: true ,
    useUnifiedTopology: true
  }
)
.then( () => console.log('Connected to db '))
.catch((err)=> console.log('catched error '+ err));
// port, listen for requests
const PORT = process.env.PORT || 3001;
/*pp.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

});*/

const server = app.listen(process.env.PORT || 3001, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});
/*
const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});

const apiai = require('apiai')(Token);
//const apiai = require('apiai')(APIAI_TOKEN);



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



  function synthVoice(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    synth.speak(utterance);
  }
  socket.on('bot reply', function(replyText) {
    synthVoice(replyText);
  });
  
  apiaiReq.end();
});
});
*/
module.exports = app;