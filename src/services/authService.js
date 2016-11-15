var jwt = require('jwt-simple');
var keys = require('../config/keys');
var models = require('../models/movieCharacterModel');


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


module.exports = {
    user: user
};