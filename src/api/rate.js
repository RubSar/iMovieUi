/**
 * Created by User on 11/14/2016.
 */
var express = require('express');
var jwt = require('jwt-simple');
var keys = require('../config/keys');
var rateApi = express.Router();

var models = require('../models/movieCharacterModel');
var auth = require('../services/authService');

var router = function () {

    rateApi.post('/set', function (req, res) {

        var id = auth.user(req);
        if (id) {
            models.User.findOne({_id: id}, function (err, user) {

                var characterQuery = {_id: req.body.characterId};
                models.MovieCharacter.findOne(characterQuery).exec(function (err, character) {
                    if (err) {
                        console.log(err);
                    }
                    if (character) {
                        models.Rate.findOne({userId: user._id, characterId: character._id}).exec(function (err, rate) {
                            if (err) {
                                console.log(err);
                            }
                            if (rate) {
                                rate.value = req.body.value || rate.value;
                                rate.userId = user._id || rate.userId;
                                rate.save();
                                character.rates.push(rate._id);
                                user.rates.push(rate._id);
                                character.save();
                                user.save();
                                res.send({
                                    message: 'updated',
                                    success: true,
                                    value: rate.value,
                                    status: 200
                                })
                            } else {
                                var newRate = new models.Rate();
                                newRate.userId = user._id;
                                newRate.characterId = req.body.characterId;
                                newRate.value = req.body.value;
                                newRate.save(function (err, doc) {
                                    character.rates.push(doc._id);
                                    user.rates.push(doc._id);
                                    user.save();
                                    character.save();
                                    res.send({
                                        message: 'created',
                                        success: true,
                                        value: newRate.value,
                                        status: 200
                                    })
                                });

                            }
                        });
                    }

                });
            });

        }
        else {

        }

    });

    rateApi.get('/rates', function (req, res) {
        models.Rate.find({characterId: req.query.characterId}, 'value', function (err, results) {
            if (err) {
                console.log(err);
            }
            res.send({
                data: results,
                success: true,
                status: 200
            });
        });


    });

    return rateApi;
};

module.exports = router();