var express = require('express');
var router = express.Router();
var user = require('../models/user.model');
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jsonwebtoken')
var authent = require('./auth');
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
    surname: req.body.surname,
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

  user.findOne(req.body.email, function (err, rows) {

    if (err) {
      res.send(err);
    }
    else {
      if (bcrypt.compareSync(req.body.password, rows[0].password)) {
        //console.log('User found', user);
        var token = jwt.sign({ email: user.email }, 'secret', { expiresIn: 3600 });
        res.status(200).json({ success: true, token: token });
      }
      else {
        res.status(401).json('Unauthorized');
      }
    }
  });


});

/* Register API */


router.post('/register', function (req, res) {

  bcrypt.hash(req.body.password, null, null, function (err, hash) {
    if (err)
      res.send(err)   
      new user ( {
      password: hash,
      email: req.body.email,
      surname: req.body.surname,  
      name: req.body.name,
      role: req.body.role   
    }).save(
      (err, newuser) => {
        if (err)
          console.log("Error message : "+err);
        else{
          console.log(newuser);
        }
      }
    )
    });
});


module.exports = router;
