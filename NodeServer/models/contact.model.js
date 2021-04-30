const mongoose=require('mongoose');

var Schema = mongoose.Schema;
var contact = new Schema ( 
  {
    
    name: { 
        type: String,
         required: true 
        },
  
    email: { 
        type: String, 
        required: true 
    },
    message: {
      type: String,
       required: true
      },

   
  },
   
  );
// hash contact password before saving into database
  module.exports = mongoose.model('contact', contact);

