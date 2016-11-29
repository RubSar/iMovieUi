var request = require('request');
var qs = require('querystring');
var createSendToken = require('./jwt.js');
var keys = require('./keys.js');
var model = require('../models/movieCharacterModel.js');

module.exports = function (req, res) {
    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.8/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.8/me?fields=' + fields.join(',');

    var params = {
        client_id: keys.FACEBOOK_APP_ID,
        redirect_uri: req.body.redirectUri,
        client_secret: keys.FACEBOOK_SECRET
        //code: req.body.code
    };

    request.get({url: accessTokenUrl, qs: params}, function (err, response, accessToken) {
        accessToken = qs.parse(accessToken);

        request.get({url: graphApiUrl, qs: accessToken, json: true}, function (err, response, profile) {
            model.User.findOne({facebookId: profile.id}, function (err, existingUser) {
                if (existingUser)
                    return createSendToken(existingUser, res);

                var newUser = new model.User();
                newUser.facebookId = profile.id;
                newUser.displayName = profile.name;
                newUser.email = profile.email;
                newUser.save(function (err) {
                    createSendToken(newUser, res);
                })

            })
        });
    });
};