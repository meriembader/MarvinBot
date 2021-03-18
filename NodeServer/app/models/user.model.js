const mongoose=require('mongoose');
var Schema = mongoose.Schema;
var user = new Schema ( 
  {
      name: String,
      surname: String,
      email: String,
      password: String
  },
   
  );


  module.exports = mongoose.model('user', user);



