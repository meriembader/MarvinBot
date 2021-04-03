const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//pour définir le schema :p
var Schema = mongoose.Schema;
var user = new Schema ( 
  {
    name: {      
      type: String,
      trim: true,  
      required: true,    
     },
     surname: {
      type: String,
      trim: true,  
      required: true,
     },
     email: {
      type: String,
      trim: true,
      required: true
     },
     password: {
      type: String,
      trim: true,
      required: true
     },
     role: {
      type: String,
      trim: true,
      required: true
     }
   

   
  },
   
  );
// hash user password before saving into database
user.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
  });

  module.exports = mongoose.model('user', user);



