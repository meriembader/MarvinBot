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
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");
const { validationResult } = require('express-validator');
const  check  = require('check');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
;
const User = db.user;
const Role = db.role;


/* GET API user listing. */
router.get('/', function(req, res, next) {
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
addUser: router.post('/', function(req, res, next) {
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
router.put('/:id', function(req, res, next) {
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

      var token = jwt.sign({ id: user.id }, config.secret, {
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




router.post('/forgotpassword', async(req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  }else {
    user.findOne(
      {
        email
      },
      (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: 'User with that email does not exist'
          });
        }

            var token = jwt.sign({ id: user.id }, "0123456789", {
        expiresIn: 31536000  // 24 hours
      });

        const emailData = {
          from: "meriem.bader1@esprit.tn",
          to: email,
          subject: `Password Reset link`,
          html: `
                    <h1>Please use the following link to reset your password</h1>
                    <a href="http://localhost:3001/reset-password/${token}">Reset your password</a>
                    <hr />
                    <p>This email may contain sensetive information</p>
                   <a href="http://localhost:3001">INDEX PAGE</a>
                `
        };
        sgMail.send(emailData)
       
                .then(sent => {
                   console.log('SIGNUP EMAIL SENT', sent)
                  res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            console.log ("hihih");
                  return res.send({

                    message: `Email has been sent to  ${email}. Follow the instruction to activate your account`
                  });
                })
                .catch(err => {
                  // console.log('SIGNUP EMAIL SENT ERROR', err)
                  return res.send({ message: err.message});
                
                  //console.log("header");
                   // return res.json({message: err.message});

                });
               

       return user.updateOne(
          {
            resetPasswordLink: token
          },
          (err, success) => {
            if (err) {
              console.log('RESET PASSWORD LINK ERROR', err);
              return res.status(400).send({
                error:
                  'Database connection error on user password forgot request'
              });
            } else {
              sgMail
                .send(emailData)
                .then(sent => {
                  console.log('SIGNUP EMAIL SENT', sent)
                  return res.send({
                    message: `Email has been sent to ${email}. Follow the instruction to activate your account`
                  });
                })
                .catch(err => {
                  // console.log('SIGNUP EMAIL SENT ERROR', err)
                  return res.send({
                    message: err.message
                  });
                });
            }
          }
        );
      }
    );
  }
})

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

module.exports = router;
