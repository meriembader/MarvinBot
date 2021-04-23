var express = require('express');
var router = express.Router();
var user = require('../models/user.model');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
var authent = require('./auth');
const config = require("../config/auth.config");
const db = require("../models");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
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

/* Login API*/
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

/* Login API
router.post('/login', function (req, res) {
  const {email, password} = req.body;
  user.findOne(req.body.email, function (err, rows) {

    if (err) {
      res.send(err);
    }
    else {
      if (bcrypt.compareSync(req.body.password, rows[0].password)) {
        //console.log('User found', user);
        const token = jwt.sign(
          {id: user._id},
          process.env.JWT_SECRET);
      res.json({
          token,
          user: {
              id: user._id,
              username: user.username,
              email: user.email,
              password: user.password,
              role: user.role,
          }
      })
      }
    
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        accessToken: token
      })
    }
  });


});*/
/*
router.post('/ffflogin', async (req, res) => {
  try {
      const {email, password} = req.body;
      //validate
      if (!email || !password) {
          return res.status(400).json({msg: "Not all fields have been entered"});
      }
      const user = await user.findOne({email: email});
      if (!user) {
          return res.status(400).json({msg: "No account with this email has been founded"});
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({msg: "Invalid credentials"});
      }
      //Using token for login
      const token = jwt.sign(
          {id: user._id},
          process.env.JWT_SECRET);
      res.json({
          token,
          user: {
              id: user._id,
              username: user.username,
              email: user.email,
              password: user.password,
              role: user.role,
          }
      })
  } catch (err) {
      res.status(500).json({error: err.message});
  }
});*/

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


/***************************************************hahahahaaha ********** */

module.exports = router;
