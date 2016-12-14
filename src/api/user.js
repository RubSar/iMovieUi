/**
 * Created by Toshiba on 11/22/2016.
 */
var express = require('express');
var mongoose = require('mongoose');
var models = require('../models/movieCharacterModel');
var api = express.Router();
var auth = require('../services/authService');


var router = function () {
    //GET actions

    api.get('/all', function(req, res){
        models.User.find({}, function(err, users){
            if (err) {

            }else{
                res.send({
                    data:users
                })
            }
        })
    });
    api.get('/update', function(req, res){
        models.User.update({}, {rates:[]}, {multi: true}, function(err, num){
            if (err) {

            }else{
                res.send({
                    data:num
                })
            }
        })
    });

    api.get('/rates', function (req, res) {
        var id = auth.user(req);
        var value = req.query.value;
        if (id) {
            models.Rate.find({userId: id, value: value})
                .select('characterId')
                .populate('characterId', 'name imgUrl')
                .exec(function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        var l = results.length;
                        var characters=[];
                        for (var x = 0; x < l; x++) {
                            characters.push(results[x].characterId);
                        }

                        res.send(200,{
                            success: true,
                            data: {
                                value:value,
                                characters:characters
                            }
                        });
                    }
                });

        } else {
            res.send({
                status: 200,
                success: true,
                message: 'unauthorized'
            })
        }
    });

    api.get('/topRatings', function (req, res) {
        var id = auth.user(req);
        if (id) {
            models.Rate.aggregate([
                {
                    $match: {
                        userId: mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $group: {
                        _id: "$value",
                        count: {$sum: 1}
                    }
                },
                {
                    "$sort": {"_id": -1}
                }
            ], function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    res.send({
                        status: 200,
                        success: true,
                        data: results
                    })
                }

            });
        } else {
            res.send({
                status: 200,
                success: true,
                message: 'unauthorized'
            })
        }

    });


    return api;
};
module.exports = router();