var jwt = require('jwt-simple');
var keys = require('../config/keys');
var moment = require('moment');

var models = require('../models/movieCharacterModel.js');
var Admin = require('../models/adminModel.js');


function user(req) {
    var authHeader = req.header('Authorization');

    if (!!authHeader) {
        var token = authHeader.split(' ')[1];
        var payload = jwt.decode(token, keys.TOKEN_SECRET);
        return payload.sub;
    } else {
        return null;
    }
}



function checkAdminPassword(req) {
    var model = req.body;
    var token = model.token;
    var payload = jwt.decode(token, keys.ADMIN_SECRET);

    if (payload.sub) {
        Admin.findOne({_id: payload.sub}, function (err, admin) {
            if (err) {
                console.log(err);
            } else {
                if (admin) {
                    if (admin.password === model.password) {
                        return true;
                    }
                } else {
                    return false;
                }
            }
        });
    } else {
        return false;
    }

}


module.exports = {
    user: user,
    checkAdminPassword: checkAdminPassword
};