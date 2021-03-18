var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

<<<<<<< HEAD
//config mongoose
var mongoose = require('mongoose');
var configDB = require('./config/db.config.json');
=======
const app = express();
require("./app/routes/user.routes")(app);
var corsOptions = {
  origin: "http://localhost:3001"
};
>>>>>>> 7d159a4bb084547872e2f751b6c86a80ea231093

var userRouter = require('./routes/user.routes');


var app = express();

<<<<<<< HEAD
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/user', userRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
=======
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our bot server." });
>>>>>>> 7d159a4bb084547872e2f751b6c86a80ea231093
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//connection mongoose
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

});
module.exports = app;
