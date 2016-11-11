var express = require('express');
var authRouter = express.Router();
var moment = require('moment');
var keys = require('../config/keys.js');
var request = require('request');
var jwt = require('jwt-simple');
var User = require('../models/userModel.js');


var passport = require('passport');

function createJWT(user) {
    var payload = {
        sub: user.facebookId,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, keys.TOKEN_SECRET);
}

    authRouter.post('/facebook', function (req, res) {
        var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
        var accessTokenUrl = 'https://graph.facebook.com/v2.8/oauth/access_token';
        var graphApiUrl = 'https://graph.facebook.com/v2.8/me?fields=' + fields.join(',');
        console.log(req.body.code);
        var params = {
            code: req.body.code,
            client_id: keys.FACEBOOK_APP_ID,
            client_secret: keys.FACEBOOK_SECRET,
            redirect_uri: req.body.redirectUri
        };

        // Step 1. Exchange authorization code for access token.
        request.get({url: accessTokenUrl, qs: params, json: true}, function (err, response, accessToken) {

            // Step 2. Retrieve profile information about the current user.
            request.get({url: graphApiUrl, qs: accessToken, json: true}, function (err, response, profile) {

                if (req.header('Authorization')) {
                    User.findOne({facebookId: profile.id}, function (err, existingUser) {
                        if (existingUser) {
                            return res.status(409).send({message: 'There is already a Facebook account that belongs to you'});
                        }
                        var token = req.header('Authorization').split(' ')[1];
                        var payload = jwt.decode(token, keys.TOKEN_SECRET);
                        User.findById(payload.sub, function (err, user) {
                            user.facebookId = profile.id;
                            user.displayName = user.displayName || profile.name;
                            user.save(function () {
                                var token = createJWT(user);
                                res.send({token: token});
                            });
                        });
                    });
                } else {
                    // Step 3. Create a new user account or return an existing one.
                    User.findOne({facebookId: profile.id}, function (err, existingUser) {
                        if (existingUser) {
                            var token = createJWT(existingUser);
                            return res.send({token: token});
                        }
                        var user = new User();
                        user.facebookId = profile.id;
                        user.displayName = profile.name;
                        user.save(function () {
                            var token = createJWT(user);
                            res.send({token: token});
                        });
                    });
                }
            });
        });
    });



module.exports = authRouter;