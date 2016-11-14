/**
 * Created by User on 11/14/2016.
 */
var express = require('express');
var jwt = require('jwt-simple');
var keys = require('../config/keys');
var rateApi = express.Router();
//var Rate = require('../models/rateModel');
//var User = require('../models/userModel');
var models = require('../models/movieCharacterModel');

var router = function () {

    rateApi.post('/set', function (req, res) {

        if (req.header('Authorization')) {
            var token = req.header('Authorization').split(' ')[1];
            var payload = jwt.decode(token, keys.TOKEN_SECRET);


            var userQuery = {facebookId: payload.sub};
            var characterQuery = {_id: req.body.characterId};

            models.User.findOne(userQuery).exec()
                .then(function (user) {
                    if (user) {
                        return models.MovieCharacter.findOne(characterQuery).exec();
                    }
                })
                .then(function (character) {
                    if (character) {
                        return models.Rate.findOne({userId: payload.sub, characterId: req.body.characterId}).exec();
                    }
                })
                .then(function (rate) {
                    if (rate) {
                        rate.value = req.body.value || rate.value;
                        rate.created = new Date();
                        rate.save();
                        res.send({
                            message: 'updated',
                            isSuccess: true,
                            status: 200
                        })
                    } else {

                        var newRate = new models.Rate();
                        newRate.userId =payload.sub;
                        newRate.characterId =req.body.characterId;
                        newRate.value =req.body.value;
                        newRate.save();
                        res.send({
                            message: 'created',
                            isSuccess: true,
                            status: 200
                        })
                    }
                });

        }

    });

    return rateApi;
};

module.exports = router();