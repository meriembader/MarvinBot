const router = require("express").Router();
const sgMail = require("@sendgrid/mail");
require('dotenv').config()
const api ="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"
sgMail.setApiKey(api);
const contact = require("../models/contact.model");



router.post('/send', async(req, res) => {
    const email = req.body.email
    const subject  = req.body.subject
    const message = req.body.message

    const Contact = new contact({
        subject: subject,
        email: email,
        message: message
    })
    const savedContact = await Contact.save();
    res.json(savedContact);
    const mail = {
        from: "meriem.bader1@esprit.tn",
        to: Contact.email,
        subject: Contact.subject,
        text: Contact.message,
        html: '<h1>Hello world</h1>'
      }
   try{
    await sgMail.send(mail);
    return res.json(mail);



   }catch(error){
       console.log(error);
   }

  })
  module.exports = router;