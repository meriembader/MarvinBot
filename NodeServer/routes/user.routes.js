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
const changepassword = require ('../models/ChangePassword');
const  check  = require('check');
var http = require('http');
const auth = require('../middlewares/auth');
var server = http.createServer(app);
var io = require('socket.io')(server);
/********************************************** */
const { validator} = require('validator') ;
const sendEmail = require( '../utils/SendMail');
const { stat } = require('fs');


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
         || !confirm_new_password
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


router.post('/forgotpassword', async(req, res, next) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Getting the value of the first error
    const firstError = errors.array().map((error) => error.msg)[0];
    // réponse HTTP 422 : serveur a compris le type de contenu et que la syntaxe de la requête est correcte mais le serveur n'a pas été en mesure de réaliser les instructions demandées.
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    //find if the mail passed by user is his own mail (stored in our DB).
    user.findOne(
      {
        email,
      },
      (err, user) => {
        //if error or the mail is not the same.
        if (err || !user) {
          return res.status(400).json({
            error:
              "User with that email does not exist. Enter your email address used in this application",
          });
        }

        // If exist generate a token.
        const token = jwt.sign(
          {
            //token with this ID
            _id: user._id,
          },
          process.env.RESET_PASSWORD_KEY,
          {
            expiresIn: "10m", //token expires in 10 minutes
          }
        );
        // Send email with this token
        const emailData = {
          from: process.env.EMAIL_FROM,
          to: email,
          subject: `Elegance App - Password Reset link`,
          html: `
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
              <td bgcolor="#02174C" align="center" style="padding: 0px 10px 0px 10px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td bgcolor="#02174C" align="center" valign="top" style="padding: 10px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: white; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                              <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome AGAIN!</h1> <img src=" http://cdn.mcauto-images-production.sendgrid.net/a9fd540df47a93d6/c7bc4c1e-fe84-45b2-a4bc-609c78775478/332x127.png" width="230" height="100" style="display: block; border: 0px;" />
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr>
              <td bgcolor="#BF1922" align="center" style="padding: 0px 10px 0px 10px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">Trouble signing in? <br><br>
                            Resetting your password is easy. <br><br> Just press the button below and follow the instructions. We’ll have you up and running in no time. </p>
                          </td>
                      </tr>
                      <tr>
                          <td bgcolor="#ffffff" align="left">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                      <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                          <table border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                  <td align="center" style="border-radius: 3px;" bgcolor="#BF1922"><a href=${process.env.CLIENT_URL}reset/${token} target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px;  display: inline-block;">Reset Your Password</a></td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr> <!-- COPY -->
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; text-align: 'center'; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">This link will expire after <b>10 minutes.</b></p>
                          </td>
                      </tr> <!-- COPY -->
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                          </td>
                      </tr> <!-- COPY -->
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;"><a href="#" target="_blank" style="color: #BF1922;">${process.env.CLIENT_URL}reset/${token}</a></p>
                          </td>
                      </tr>
                                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">This email may contain sensetive information. <br><br> If you did not make this request then please ignore this email.<br><br></p>
                          </td>
                      </tr> <!-- COPY -->
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">Cheers,<br>Rebirth Team</p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          
          <tr>
              <td bgcolor="#BF1922" align="center" style="padding: 0px 10px 0px 10px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td bgcolor="#BF1922" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          </table>    
                `,
        };

        return user.updateOne(
          {
            resetPasswordLink: token,
          },
          (err, success) => {
            if (err) {
              console.log("RESET PASSWORD LINK ERROR", err);
              return res.status(400).json({
                error:
                  "Database connection error on user password forgot request",
              });
            } else {
              sgMail
                .send(emailData)
                .then((sent) => {
                  // console.log('SIGNUP EMAIL SENT', sent)
                  return res.json({
                    message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
                  });
                })
                .catch((err) => {
                  console.log("SIGNUP EMAIL SENT ERROR", err);
                  return res.json({
                    message: err.message,
                  });
                });
            }
          }
        );
      }
    );
  }
}
)
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

router.get('/count',(req,res)=>{

  user.count( {}, function(err, result){

      if(err){
          res.send(err)
      }
      else{
          res.json(result)
      }

 })


})


/*router.put('/user-profile/:id', async(req, res, next) => {
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
*/
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
    console.log("Connected to `" + DATABASE_NAME + "`!");
});

app.get("/stat", (request, response) => {
  collection.agregate([
    { "$group":{"_id":"$role","count": {"$sum": 1}}}
  ])
});*/
module.exports = router;
