var express = require('express');
var router = express.Router();
var dossierMedical = require('../models/dossierMedical.model');

var app = express();



/* GET API dossierMedical listing. */
router.get('/', function(req, res, next) {
  dossierMedical.find(
    (err, dossierMedical )=>{
      if(err)
        console.log(err);
      else
        res.json(dossierMedical);
        /*res.render('form.twig',
          {
            title : "dossierMedical list",
            cont : dossierMedical
          }
        )*/
    }
  )
});

/* POST API dossierMedical */
 router.post('/addDossierMedical', function(req, res, next) {
  new dossierMedical({
    userId: req.body.userId,
    ResultDiagnostic: req.body.ResultDiagnostic,
    mark: req.body.mark,
    Date: req.body.Date,
    username: req.body.username,
    
  }).save(
    (err, newuser) => {
      if (err)
        console.log("Error message : "+err);
      else{
        console.log(newuser);
        res.send(" New dossierMedical added "+ newuser._id)
      }
    }
  )
});

/* PUT API dossierMedical */
router.put('/:id', function(req, res, next) {
    dossierMedical.findByIdAndUpdate(
      req.params.id,
      req.body,
      function (err, data ) {
        if (err) console.log(err);
        else res.json(req.body);
      }
    )
});


/* DELETE API dossierMedical */
router.delete('/:id', function(req, res, next) {
  dossierMedical.findByIdAndRemove(
    req.params.id,
    function (err, data ) {
      if (err) console.log(err);
      else res.send('dossierMedical deleted');
    }
  )
});



module.exports = router;
