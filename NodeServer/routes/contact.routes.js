var express = require('express');
var router = express.Router();
var contact = require('../models/contact.model');
const nodemailer = require("nodemailer");
var app = express();

/* GET API contact listing. */
router.get('/', function(req, res, next) {
 
  contact.find(
    (err, contact )=>{
      if(err)
        console.log(err);
      else
        res.json(contact);
        /*res.render('form.twig',
          {
            title : "contact list",
            cont : contact
          }
        )*/
    }
  )
});

/* POST API contact */
 router.post('/addcontact', async(req, res, ) =>{
  const name  = req.body.name
  const email = req.body.email
  const message = req.body.message
  const Contact = new contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    
    
  })
  const savedContact = await Contact.save();
    res.json(savedContact);
  
  const texte = `
  nous avons bien recu votre reclamation vous allez etre contacter 
  par le service d'administration dans les plus proches délai
  merci <3 
 `;
 var transporter = nodemailer.createTransport({
 service: "gmail",
 auth: {
   user: "meriembader1997@gmail.com",
   pass: "@duriz689",
 },
 });
 
 var mailOptions = {
 from: "meriembader1997@gmail.com",
 to: Contact.email,
 subject: `Requette recu`,
 text: texte,
 }
 console.log("hahah")
 transporter.sendMail(mailOptions, function (error, info) {
 if (error) {
  console.log("damn")
 } else {
   console.log("Email sent: " + info.response);
  
  // res.json(userr);
 }
 });
        console.log();
        res.send(" New contact added ")
     
  
 
});

/* PUT API contact */
router.put('/:id', function(req, res, next) {
    contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      function (err, data ) {
        if (err) console.log(err);
        else res.json(req.body);
      }
    )
});


/* DELETE API contact */
router.delete('/:id', function(req, res, next) {
  contact.findByIdAndRemove(
    req.params.id,
    function (err, data ) {
      if (err) console.log(err);
      else res.send('contact deleted');
    }
  )
});



module.exports = router;
