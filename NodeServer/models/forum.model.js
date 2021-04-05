const mongoose=require('mongoose');

const saltRounds = 10;

//pour définir le schema :p
var Schema = mongoose.Schema;
var forum = new Schema ( 
  {
    title: {
      type: String,
      trim: true,  
      required: true,
     },
     description: {
      type: String,
      trim: true,  
      required: true,
     },
     author: {
      type: String,
      trim: true,
      required: true
     },
     
   
  },
   
  );
// hash forum password before saving into database
  module.exports = mongoose.model('forum', forum);



