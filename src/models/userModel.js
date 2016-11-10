/**
 * Created by Toshiba on 10/29/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
   email:String,
   facebook:String,
   userName:String
});

module.exports =mongoose.model('User', UserSchema);