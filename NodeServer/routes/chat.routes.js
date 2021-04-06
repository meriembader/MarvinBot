var express = require('express');
var router = express.Router();
var chat = require('../models/chat.model');

/* GET API chat listing. */
router.get('/', function(req, res, next) {
  chat.find(
    (err, chat )=>{
      if(err)
        console.log(err);
      else
        res.json(chat);
        /*res.render('form.twig',
          {
            title : "chat list",
            cont : chat
          }
        )*/
    }
  )
});



/* POST API chat */
 router.post('/', function(req, res, next) {
  new chat({
    question1: req.body.question1,
    question2: req.body.question2,
    question3: req.body.question3,
    question4: req.body.question4,

   
  }).save(
    (err, newuser) => {
      if (err)
        console.log("Error message : "+err);
      else{
        console.log(newuser);
        res.send(" New chat added "+ newuser._id)
      }
    }
  )
});

/* PUT API chat */
router.put('/:id', function(req, res, next) {
    chat.findByIdAndUpdate(
      req.params.id,
      req.body,
      function (err, data ) {
        if (err) console.log(err);
        else res.json(req.body);
      }
    )
});

/* DELETE API chat */
router.delete('/:id', function(req, res, next) {
  chat.findByIdAndRemove(
    req.params.id,
    function (err, data ) {
      if (err) console.log(err);
      else res.send('chat deleted');
    }
  )
});



module.exports = router;
