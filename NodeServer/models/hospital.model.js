const mongoose=require('mongoose');

const saltRounds = 10;

//pour définir le schema :p
//pour définir le schema :p//pour définir le schema :p

var Schema = mongoose.Schema;
var hospital = new Schema ( 
  {
    name: {
      type: String,
      trim: true,  
      required: true,
     },
     address: {
      type: String,
      trim: true,  
      required: true,
     },
     status: {
      type: String,
      trim: true,
      required: true
     },
     Longitude: {
      type: String,
      trim: true,
      required: true
     },
     Latitude: {
      type: String,
      trim: true,
      required: true
     },
     
     
   
  },
   
  );
// hash hospital password before saving into database
  module.exports = mongoose.model('hospital', hospital);



