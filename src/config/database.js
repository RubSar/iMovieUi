/**
 * Created by User on 11/10/2016.
 */


var mongoose = require('mongoose');
module.exports =function(){
    mongoose.connect('mongodb://comics-admin:born77villain77ml77c@ds031597.mlab.com:31597/comics', function (err) {
        if (err) {
            console.err(err);
        } else {
            console.log('Connected');
        }
    });
};