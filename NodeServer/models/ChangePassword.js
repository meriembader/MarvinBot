const mongoose=require('mongoose');

var Schema = mongoose.Schema;
var ChangePassword = new Schema ( {
    old_password : String,
    new_password : String,
    confirm_new_password: String,
  userId: String,
 } );
// hash ChangePassword password before saving into database
  module.exports = mongoose.model('ChangePassword', ChangePassword);



