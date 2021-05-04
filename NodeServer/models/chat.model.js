const mongoose=require('mongoose');

const saltRounds = 10;

//pour définir le schema :p
//pour définir le schema :p//pour définir le schema :p

var Schema = mongoose.Schema;
var chat = new Schema ( 
  {
    id_user: {
      type: String,
      trim: true,  
      required: true,
     },
     questions: {
      type: Array,
      trim: true,  
      required: true,
     },
     date: {
      type: String,
      trim: true,
      required: true
     },
  
   
  },
   
  );
// hash chat password before saving into database
  module.exports = mongoose.model('chat', chat);



