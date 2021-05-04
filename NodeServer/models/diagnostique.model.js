const mongoose=require('mongoose');

const saltRounds = 10;

//pour définir le schema :p
//pour définir le schema :p//pour définir le schema :p

var Schema = mongoose.Schema;
var diagnostique = new Schema ( 
  {
    id_user:{
      type: String,
      trim: true,  
      required: true,
    },
     result: {
      type: String,
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
// hash diagnostique password before saving into database
  module.exports = mongoose.model('diagnostique', diagnostique);



