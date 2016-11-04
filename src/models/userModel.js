/**
 * Created by Toshiba on 10/29/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
   email:String,
   userName:String,
   password:String,
   admin:Boolean
});

module.exports =mongoose.model('User', UserSchema);