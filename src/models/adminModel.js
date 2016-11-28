/**
 * Created by User on 11/28/2016.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


var AdminSchema = new Schema({
    email: String,
    userName: String,
    password: String,
    role: String
});

// generating a hash
AdminSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
AdminSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Admin', AdminSchema);