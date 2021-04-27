var express = require('express');
var router = express.Router();
var forum = require('../models/forum.model');

var app = express();



/* GET API forum listing. */
router.get('/', function(req, res, next) {
  forum.find(
    (err, forum )=>{
      if(err)
        console.log(err);
      else
        res.json(forum);
        /*res.render('form.twig',
          {
            title : "forum list",
            cont : forum
          }
        )*/
    }
  )
});



/* POST API forum */
 router.post('/addForum', function(req, res, next) {
  new forum({
    starValue: req.body.starValue,
    description: req.body.description,
    author: req.body.author,
    
  }).save(
    (err, newuser) => {
      if (err)
        console.log("Error message : "+err);
      else{
        console.log(newuser);
        res.send(" New forum added "+ newuser._id)
      }
    }
  )
});

/* PUT API forum */
router.put('/update', function(req, res, next) {
    forum.findByIdAndUpdate(
      req.params.id,
      req.body,
      function (err, data ) {
        if (err) console.log(err);
        else res.json(req.body);
      }
    )
});

/* DELETE API forum */
router.delete('/:id', function(req, res, next) {
  forum.findByIdAndRemove(
    req.params.id,
    function (err, data ) {
      if (err) console.log(err);
      else res.send('forum deleted');
    }
  )
});



module.exports = router;
