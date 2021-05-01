var express = require('express');
const {PythonShell} =require('python-shell');
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

  let options = {
    mode: 'text',
    //pythonOptions: ['-u'], // get print results in real-time
    pythonPath: 'C:/Users/ali/Desktop/MarvinBot_deprecated/NodeServer/venv/Scripts/python', //If you are having python_test.py script in same folder, then it's optional.
    args: [req.body.input] //An argument which can be accessed in the script using sys.argv[1]
  };
  
  PythonShell.run('model.py', options, function (err, result){
    if (err) throw err;
    // result is an array consisting of messages collected 
    //during execution of script.
    res.send(result.toString());
    console.log("success");
   
  });
  


  /*new diagnostique({
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
  )*/
  //console.log(req.body.input.toString());
    
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
