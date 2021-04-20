var express = require('express');
var router = express.Router();
var diagnostique = require('../models/diagnostique.model');

/* GET API diagnostique listing. */
router.get('/', function(req, res, next) {
  diagnostique.find(
    (err, diagnostique )=>{
      if(err)
        console.log(err);
      else
        res.json(diagnostique);
        /*res.render('form.twig',
          {
            title : "diagnostique list",
            cont : diagnostique
          }
        )*/
    }
  )
});



/* POST API diagnostique */
 router.post('/', function(req, res, next) {
  new diagnostique({
    title: req.body.title,
    result: req.body.result,
    score: req.body.score,
    date: req.body.date
  }).save(
    (err, nesdiagnostique) => {
      if (err)
        console.log("Error message : "+err);
      else{
        console.log(nesdiagnostique);
        res.send(" New diagnostique added "+ nesdiagnostique._id)
      }
    }
  )
});

/* PUT API diagnostique */
router.put('/:id', function(req, res, next) {
    diagnostique.findByIdAndUpdate(
      req.params.id,
      req.body,
      function (err, data ) {
        if (err) console.log(err);
        else res.json(req.body);
      }
    )
});

/* DELETE API diagnostique */
router.delete('/:id', function(req, res, next) {
  diagnostique.findByIdAndRemove(
    req.params.id,
    function (err, data ) {
      if (err) console.log(err);
      else res.send('diagnostique deleted');
    }
  )
});



module.exports = router;
