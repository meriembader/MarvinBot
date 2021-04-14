const mongoose=require('mongoose');

const saltRounds = 10;

//pour définir le schema :p
//pour définir le schema :p//pour définir le schema :p

var Schema = mongoose.Schema;
var chat = new Schema ( 
  {
    question1: {
      type: String,
      trim: true,  
      required: true,
     },
     question2: {
      type: String,
      trim: true,  
      required: true,
     },
     question3: {
      type: String,
      trim: true,
      required: true
     },
     question4: {
        type: String,
        trim: true,
        required: true
       },
   
  },
   
  );
  
// hash chat password before saving into database
  module.exports = mongoose.model('chat', chat);



