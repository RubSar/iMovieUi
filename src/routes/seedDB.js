/**
 * Created by User on 10/26/2016.
 */
var express = require('express');

var seedRouter = express.Router();


var User = require('../models/userModel');



//
//seedRouter.route('/init/newuser').get(function (req, res) {
//
//    array.forEach(function(item){
//        var user = new User({
//            email: item.email,
//            userName: item.userName,
//            password: item.password,
//            admin: false
//        });
//        user.save();
//    });
//    res.send('Ok');
//
//
//});



module.exports = seedRouter;



