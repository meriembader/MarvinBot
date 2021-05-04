
var express = require('express');
var router = express.Router();
var user = require('../models/user.model');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
var authent = require('./auth');
const config = require("../config/auth.config");
const db = require("../models");
const { authJwt } = require("../middlewares");
var app = express();
const _ =require('lodash');
const controller = require("../controllers/user.controller");
const { validationResult } = require('express-validator');
const changepassword = require ('../models/ChangePassword');
const  check  = require('check');
var http = require('http');
const auth = require('../middlewares/auth');
var server = http.createServer(app);
var io = require('socket.io')(server);
/********************************************** */
const { validator} = require('validator') ;

const { stat } = require('fs');
const { getMaxListeners } = require('../models/user.model');
const nodemailer = require("nodemailer");
//var mongoose = require('mongoose');
//const { user } = require('../models');
const User = db.user;
const Role = db.role;

/* GET API user listing. */
router.get('/', auth, function(req, res, next) {
  user.find(
    (err, user )=>{
      if(err)
        console.log(err);
      else
        res.json(user);
        /*res.render('form.twig',
          {
            title : "user list",
            cont : user
          }
        )*/
    }
  )
});

/* POST API user */
addUser: router.post('/',auth, function(req, res, next) {
  new user({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  }).save(
    (err, newuser) => {
      if (err)
        console.log("Error message : "+err);
      else{
        console.log(newuser);
        res.send(" New user added "+ newuser._id)
      }
    }
  )
});

/* PUT API user */
router.put('/:id',auth, function(req, res, next) {
    user.findByIdAndUpdate(
      req.params.id,
      req.body,
      function (err, data ) {
        if (err) console.log(err);
        else res.json(req.body);
      }
    )
});

/* DELETE API user */
router.delete('/:id', function(req, res, next) {
  user.findByIdAndRemove(
    req.params.id,
    function (err, data ) {
      if (err) console.log(err);
      else res.send('user deleted');
    }
  )
});


/* Login API*/
router.post('/login', function (req, res) {
  user.findOne({
    username: req.body.username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id ,role:user.role,username:user.username,password:user.password,email:user.email}, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
      });

  
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        accessToken: token
      });
    });
});
//valid token
router.post("/tokenIsValidUser", async (req, res) => {
  try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);


      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);

      return res.json(true);
  } catch (err) {
      res.status(500).json({error: err.message});
  }
});



/* Register API */


router.post('/register', async (req, res) => {
  try {
    
      const {username, email, password, role} = req.body;
      //validate
      if (!username
          || !email
          || !password
          || !role
        ) {
          return res.status(400).json({msg: "Not all fields have been entered"}); //bad request
      }
      if (password.length < 5) {
          return res.status(400).json({msg: "The password needs to be at least 5 characters long."}); //bad request
      }
      const existingUser = await user.findOne({email: email});
      if (existingUser) {
          return res.status(400).json({msg: "An account with this email already exists"});
      }
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      console.log(passwordHash);
      const newuser = new user({
        username,
        email, 
        password: passwordHash,
        role
      });
      const savedUser = await newuser.save();
      res.json(savedUser);

  } catch (err) {
      res.status(500).json({error: err.message});
      console.log("hi there");
  }
});
/*
router.post('/mail',async(req, res) => {
const msg = {
  to: 'meriembader8@gmail.com', // Change to your recipient
  from: 'meriem.bader1@esprit.tn', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
})*/
/* forgot password */

router.put('/ChangePassword/:userId', async (req, res, next) => {
  try {
      const userUpdatePwd = user.findById(req.params.id);
      const {old_password, new_password, confirm_new_password} = req.body;
     //validate
     if (!old_password
         || !new_password
         ) {
         return res.status(400).json({msg: "Not all fields have been entered"}); //bad request
     }
     if (old_password === new_password) {
         return res.status(400).json({msg: "Old password and new password have the same value."}); //bad request
     }
     if (new_password !== confirm_new_password) {
         return res.status(400).json({msg: "new password and confirm new password must be equals."}); //bad request
     }

     const salt = await bcrypt.genSalt();
     const passwordHash = await bcrypt.hash(new_password, salt);
     console.log(passwordHash);
     console.log("hihi");
     console.log(new_password);
    console.log('pfffffffffffffffff');
     const changepassword1 = new changepassword({
         new_password: passwordHash,
         userId: req.params.id,
     });
     console.log("hihih");
     console.log(new_password);
     const updated = await changepassword1.save();
     res.json(updated);
     console.log('password has been updated');

 }  catch(e) {
  console.log('Catch an error: ', e)
}

const userUpd = await user.findByIdAndUpdate(req.params.id);
     //const passwordSet = await changepassword.findOne({userId: req.params.id});
     console.log(userUpd);
     //console.log(passwordSet);
     userUpd.password = new_password;
     await userUpd.save();
})

app.post('/send', async (req, res) => {
  
  res.send('email sent!');

  });


router.post('/forgotpassword', async(req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
     res.status(422).json({
      errors: firstError
    });
  }else {
    user.findOne(
      {
        email
      },
      (err, user) => {
        if (err || !user) {
           res.status(400).json({
            error: 'User with that email does not exist'
          });
        }

            var token = jwt.sign({ id: user.id }, "0123456789", {
        expiresIn: 31536000  // 24 hours
      });
      const resetUrl =` http://localhost:3001/user/resetpassword/${token}`;
      const message = `
      You have requested a password reset
      Please make a put request to the following link:
      <a href=${resetUrl}> click here</a>
      <a href="http://localhost:3000/auth/login">INDEX PAGE</a>

    
    `;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "meriembader1997@gmail.com",
      pass: "@duriz689",
    },
  });

  var mailOptions = {
    from: "meriembader1997@gmail.com",
    to: `${email}`,
    subject: `Password Reset link`,
    text: message,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      console.log(error);
      user.resetPasswordLink = undefined;
      user.resetPasswordExpire = undefined;
      res.json(userr);
    }
  });
}
)
  }
})
// this is the function i try to send an email ( forgot password ) look what it bo nhh 

router.post('/resetpassword',async (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    if (resetPasswordLink) {
      jwt.verify(resetPasswordLink, config.secret, function(
        err,
        decoded
      ) {
        if (err) {
          return res.status(400).json({
            error: 'Expired link. Try again'
          });
        }

       user.findOne(
          {
            resetPasswordLink
          },
          (err, user) => {
            if (err || !user) {
              return res.status(400).json({
                error: 'Something went wrong. Try later'
              });
            }

            const salt = bcrypt.genSalt();
            const passwordHash = bcrypt.hashSync(newPassword,8);

            const updatedFields = {
              password: passwordHash,
              resetPasswordLink: ''

            };

            user = _.extend(user, updatedFields);

            user.save((err, result) => {
              if (err) {
                return res.status(400).json({
                  error: 'Error resetting user password'
                });
              }
              res.json({
                message: `Great! Now you can login with your new password`
              });
            });
          }
        );

      });
    }
  }
});

/*
router.get('/stat',  async (req, res) =>{
  const pipeline = [ { $group: { _id: "$role", nb_user: { $sum: 1 } } },];
  const users = user.aggregate(pipeline).then((data)=>{ return res.json(data);});
 
  
})*/

router.get('/stat',  function  (req, res) {
  //const pipeline = [ { $group: { _id: "$role", nb_user: { $sum: 1 } } },];
  user.aggregate([
    {
      $group: { 
        _id: "$role",
         nb_user: { $sum: 1 }
         }
    }
  ], function (err, result) {
    console.log(result);
    res.json(result);
});
  
})




router.put('/user-profile/:id', async(req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
    console.log(url);
  const userProfil = new userProfil({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      email: req.body.email,
      userId: req.params.id
  });
  userProfil.save().then(result => {
      res.status(201).json({
          message: "Admin Updated Successfully!",
         userCreated: {
              _id: result._id,
              
          }
      })
  }).catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      });
  });
  const userToUpdate = await user.findByIdAndUpdate(req.params.id);
  await userToUpdate.save();
 
})

/*
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb://localhost:27017/";
const DATABASE_NAME = "MarvinBot";
var database, collection;
MongoClient.connect(CONNECTION_URL, 
  { useNewUrlParser: true }, (error, client)=> {
    if(error) {
        throw error;
    }
    database = client.db(DATABASE_NAME);
    collection = database.collection("users");
    console.log("Connected to " + DATABASE_NAME + "!");
});
app.get("/stat", (request, response) => {
  collection.agregate([
    { "$group":{"_id":"$role","count": {"$sum": 1}}}
  ])
});*/
module.exports =router;