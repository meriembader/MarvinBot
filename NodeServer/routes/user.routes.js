var express = require('express');
var router = express.Router();
var user = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

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
router.post('/login', function (req, res) {
  user.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
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

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
});
/* Register API */


//signup
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
router.post('/register', function (req, res) {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
});
*/
/***************************************************hahahahaaha ********** */


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/doctor",
    [authJwt.verifyToken, authJwt.isDoctor],
    controller.doctorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
module.exports = router;
