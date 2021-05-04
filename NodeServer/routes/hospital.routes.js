var express = require('express');
var router = express.Router();
var hospital = require('../models/hospital.model');

var app = express();



/* GET API hospital listing. */
router.get('/', function (req, res, next) {
  hospital.find(
    (err, hospital) => {
      if (err)
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
router.post('/', function (req, res, next) {
  new hospital({
    name: req.body.name,
    address: req.body.address,
    status: req.body.status,
    Longitude: req.body.Longitude,
    Latitude: req.body.Latitude
  }).save(
    (err, newuser) => {
      if (err)
        console.log("Error message : " + err);
      else {
        console.log(newuser);
        res.send(" New hospital added " + newuser._id)
      }
    }
  )
});

/* POST API hospital 
router.post('/addnearhospital', async (req, res)=> {
  try{
  const {name, address, status, Longitude, Latitude} = req.body;
  const existHospital = await hospital.findOne({address: address})
  if(existHospital) {
return res.status(400).json({message: "l'hopitale existe deja bb"});
  }
  const newHospital= new hospital({
    name,
    address,
    status,
    Longitude,
    Latitude
  })
   const savedHospital = await newHospital.save();
   res.json(savedHospital);
  }catch (err){
    res.status(500).json({error: err.message});
    console.log("finger crushed!")
  }
         
      

  });*/

/* POST API hospital */
router.post('/testtest', async (req, res) => {
  console.log('results', req.body);
  try {
    for (var i = 0; i < req.body.length; i++) {

      const existHospital = await hospital.findOne({ address: req.body[i].placeId })
      if (!existHospital) {
        new hospital({
          name: req.body[i].placeName,
          address: req.body[i].placeId,
          status: req.body[i].placeTypes,
          Longitude: req.body[i].coordinate.longitude,
          Latitude: req.body[i].coordinate.latitude
        })
          .save(
            (err, newuser) => {
              if (err)
                console.log("Error message : " + err);
              else {
                console.log(newuser);

              }
            }
          )
      }
      /*  hospital.exists({address: req.body[i].placeId}, function (err, result) {
         if (!result){
      
              }
         
             
            //console.log('results',req.body[i]);
    else {
      console.log('error : hospital exist');*/
      //res.send(" hosptal already exists ")

    }
  } catch (error) {
    res.status(500).json({error: error.message});
  }

  res.send("hospital saved")
});








/* PUT API hospital */
router.put('update/:id', function (req, res, next) {
  hospital.findByIdAndUpdate(
    req.params.id,
    req.body,
    function (err, data) {
      if (err) console.log(err);
      else res.json(req.body);
    }
  )
});

/* DELETE API hospital */
router.delete('/:id', function (req, res, next) {
  hospital.findByIdAndRemove(
    req.params.id,
    function (err, data) {
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
