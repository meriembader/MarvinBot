var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const app = express();
const data = require('../mylogreg.json');
const cors = require("cors");
const bodyParser = require("body-parser");

//const pynode = require('@fridgerator/pynode')
//const _ = require('lodash');
app.use(express.json());
app.use(cors());
/*
pynode.startInterpreter();

pynode.appendSysPath('./');
pynode.openFile('model');

let regressionModel = {};

app.get('/api/covid_predict', (req, res) => {
  new Promise((resolve, reject) => {
      try {
        if (_.isEmpty(regressionModel)) {
          console.log('calling python');
          regressionModel = pynode.call('build_regression_model');
        }
        resolve(regressionModel);
      } catch(err) {
        console.log(err);
        reject('failed to load covid variables');
      }
  })
  .then(response => res.send(response))
  .catch(err => res.err(err));
});

*/
/*
const trainingData = data.map(item => ({
  output: item.X_train
}));
network.train(trainingData, {
  iterations: 2000
})*/
/*

app.get('/predict',function(req,res){
	console.log(req.query);
res.render('index');
})*//*
const trainingData = data.map(item => ({
  output: item.X_train
}));
network.train(train      ingData, {
  iterations: 2000
})




/*********************************Chat************ */

const db = require("./models");
const Role = db.role;


const Token= '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCSIweI7uFzB07K\nRlH+Wo5bqiT2Tx/Jql18JxWJ7+pOWfbLU2mA8aFqOzyOZjmt1Mt0OJnaDgQPEJCU\nNcB0D4AozvSPXgNdUrAJzHTef/mUCEw319B4gjs98uRCncSrMuvIWUKf+K1uEmU1\n9SHQLiLyTty3EVvrEeE0A7ewioP+lrXKzGmF7UCImExRVaUL7w8mFQCt5l80r3ha\neknZ35YWP+O4fv4ZtOEs0HEvgK5j/U76YUJWUTGHChTG1+4opeZm7PB5ASWfC3y/\noov+++c90Ti2BehFr6iS+F55ApPcLyezWIx7oO3lyOY8as5iBOYfh/pAY3ozxj0R\nmLEOCgdvAgMBAAECggEAAh0yCuxu5BF2o2ZS4cKXv53dkXLmS1LE0nGbuqiboVYb\nsagEnA/ZppPWqBGQFZ4KO7fSwWFuqyuxiE/rnAbH8zPAYT0jbglBHkIG/6S5A361\nzmncMPoZ5N4HBAbVid3opJNB/daXCx6rJgNSKtThLGYMX8cHS70w+gqVJ59vEhv3\nbwqx0469AqWonbD0BhgrML9oMm8OFaIIImszAxMKCxkHg7HjcYx1a6qos5ZVKAMw\nMeeHtRtPsUy0MN0Q6Z5qaYGS8t5tCQuZkh4p3+ffP+ZScUegv8JLDfMVNCXFkNAo\nfrd5Hi5MKSfBkzeeU+cFwmm+027LYy757dX/D0MQuQKBgQDFp7MiiupOs2/KQttA\ng7y6DRmnARthl6SAaCExQeeTONWVMCoeYrIDNe17pXFltlnrJ/nAvP39qcec88tH\n7SbKmUUG/JkXRufCsZQ1CXbgILNywBo2bDFqpPtevD5vzB5BK6MEeGSn8NwbIS11\nynMePZCnZQ6nVeLDxSokLQAJGQKBgQC9RjmKufoD/l46rSLFOb3qJyalV+ZCCFNq\nn3UokRa0O3Ws3Sn1/UgnvjL1tEokCSP19LG2d4xFHaFEgIblCirfaq1m3mGQFAnK\n6TsvRDP1wkre98+kqxiIWf+ehnDIE/9/UbGuED0WaDVKN3tXrg9uqGlc1ojtuHgv\n2HBkOpg9xwKBgQCzWGl4rGfSpYqIEoXzUhXLE9v051I7CWfgg5uqoExKD8XtKtjs\n3Uz9EM+94+6zBfUtJQa/1jz5EDbpuWT4jL0oFE7H+ifHMTVWOd9rCH1u/P0W4Cxo\nuV9VjwHvggt9Uc8Z/0hZ5AwhPrHZhA9F1D8Eb4Rz/4R+XbX3QU3tqU9g8QKBgAhA\nTHfgvaZ461CxhYeFieLwS/3/Q/ly9Xf7dZcMJCo9QVcE2TRxEzkwUHZnoqfJgjjR\nrwGeWo4UyZf75mWLuOy+cMrAPQ6T4Q1od30LAxzemHb55KJwFwSyr7MQd1AxlvzM\n6esFqDQW3OPcYVMkMmYHj3hNnfCHDy4+yD+GUma3AoGABOBqmPoVoPUvp4tJB7z5\nlbRlp3/q39yt9C+GYkBLeRH6vK8MqefhpxzmsieF0dY9nSZgSXOj21VwLRUdqr0a\nFMdN6u8WVw0hLxvFsXjaBlSaFJ+dBsvE00+ANt06yeu8cOtg5zeML0cn2m1gQ0xB\nOsEAXTOZaNFOHzCI/sqqZgY=\n-----END PRIVATE KEY-----\n'
require('dotenv').config()
const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;



/* *************************EndChat******************* */

//config mongoose
var mongoose = require('mongoose');
var configDB = require('./config/db.config.json');

var userRouter = require('./routes/user.routes');
var forumRouter = require('./routes/forum.routes');
var chatRouter = require('./routes/chat.routes');
var diagnostiqueRouter = require('./routes/diagnostique.routes');

var authRouter = require('./routes/auth.routes');
var hospitalRouter = require('./routes/hospital.routes');
var dossierMedicalRouter = require('./routes/DossierMedical.routes');
var ContactRouter = require('./routes/contact.routes');


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
app.use('/dossierMedical', dossierMedicalRouter);
app.use('/contact', ContactRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
 // res.render('error');
});


const connect = mongoose.connect(
  process.env.CUSTOMER_MyConnectionString,{  useNewUrlParser: true ,useUnifiedTopology: true})
  
    
  

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

const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});

const apiai = require('apiai')(Token);
//const apiai = require('apiai')(APIAI_TOKEN);


// Web UI
app.get('/', (req, res) => {
  res.sendFile('index.html');
});  

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



module.exports = app;
