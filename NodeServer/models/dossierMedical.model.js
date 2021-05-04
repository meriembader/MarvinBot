const mongoose=require('mongoose');


var Schema = mongoose.Schema;
var dossierMedical = new Schema ( 
  {
    name: {
      type: String,
      trim: true,  
      required: true,
     },
     ResultDiagnostic: {
      type: String,
      trim: true,  
      required: true,
     },
     email: {
      type: String,
      trim: true,
      required: true
     },
     Vaccin: {
      type: String,
      trim: true,
      required: true
     },
   
     mark: {
      type: String,
      trim: true,
      required: true
     },
     dateNaissance: {
      type: Date,
      trim: true,
      required: true
     },
     Date: {
        type: Date,
        trim: true,
        required: true
       },
    
  },
   
  );
// hash forum password before saving into database
  module.exports = mongoose.model('dossierMedical', dossierMedical);



