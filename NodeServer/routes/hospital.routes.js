var express = require('express');
var router = express.Router();
var hospital = require('../models/hospital.model');

var app = express();



/* GET API hospital listing. */
router.get('/', function(req, res, next) {
  hospital.find(
    (err, hospital )=>{
      if(err)
        console.log(err);
      else
        res.json(hospital);
        /*res.render('form.twig',
          {
            name : "hospital list",
            cont : hospital
          }
        )*/
    }
  )
});



/* POST API hospital */
 router.post('/', function(req, res, next) {
  new hospital({
    name: req.body.name,
    address: req.body.address,
    status: req.body.status,
    Longitude: req.body.Longitude,
    Latitude: req.body.Latitude
  }).save(
    (err, newuser) => {
      if (err)
        console.log("Error message : "+err);
      else{
        console.log(newuser);
        res.send(" New hospital added "+ newuser._id)
      }
    }
  )
});

/* PUT API hospital */
router.put('update/:id', function(req, res, next) {
    hospital.findByIdAndUpdate(
      req.params.id,
      req.body,
      function (err, data ) {
        if (err) console.log(err);
        else res.json(req.body);
      }
    )
});

/* DELETE API hospital */
router.delete('/:id', function(req, res, next) {
  hospital.findByIdAndRemove(
    req.params.id,
    function (err, data ) {
      if (err) console.log(err);
      else res.send('hospital deleted');
    }
  )
});

router.get('/count',(req,res)=>{

  hospital.count( {}, function(err, result){

      if(err){
          res.send(err)
      }
      else{
          res.json(result)
      }
 })
})


module.exports = router;
