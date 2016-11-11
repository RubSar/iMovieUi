/**
 * Created by User on 11/11/2016.
 */
var jwt = require('jwt-simple');
var moment = require('moment');
var keys = require('../config/keys.js');


module.exports = function (user, res) {
    var payload = {
        sub: user.id,
        exp: moment().add(10, 'days').unix()
    };

    var token = jwt.encode(payload, keys.TOKEN_SECRET);

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
};