/**
 * Created by User on 11/28/2016.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


var AdminSchema = new Schema({
    email: String,
    password: String,
    userName: String,
    role: String
});

// checking if password is valid
AdminSchema.methods.validPassword = function (password) {
    return password === this.password;
};

module.exports = mongoose.model('Admin', AdminSchema);