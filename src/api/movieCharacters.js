/**
 * Created by Toshiba on 10/31/2016.
 */
var express = require('express');
var models = require('../models/movieCharacterModel');
//var User = require('../models/userModel');
var keys = require('../config/keys.js');
var jwt = require('jwt-simple');


var api = express.Router();


var router = function () {
    //GET actions

    api.route('/all').get(function (req, res) {

        models.MovieCharacter.find({}, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                res.send({
                    data: results,
                    status: 200
                });
            }
        });
    });

    api.route('/top').get(function (req, res) {
       models.MovieCharacter.find({}).limit(10).exec(function(err, results){
            if (err) {
                console.log(err);
            }else{
                res.send({
                    data: results,
                    status: 200
                });
            }
        })
    });

    api.route('/artists').get(function (req, res) {
        models.MovieCharacter.aggregate([
            {
                $group: {
                    _id: '$playedBy',
                    count: {$sum: 1}
                }
            },
            {
                "$sort": {"count": -1}
            },
            {"$limit": 10}
        ], function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send({
                    data: result,
                    status: 200
                });
            }
        });
    });

    api.route('/byArtist').get(function (req, res) {
        var token = req.header('Authorization').split(' ')[1];
        var payload = jwt.decode(token, keys.TOKEN_SECRET);

        models.MovieCharacter.find({playedBy: req.query.artist}, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                res.send({
                    data: results,
                    status: 200
                });
            }
        });
    });

    api.route('/byYear').get(function (req, res) {
       models.MovieCharacter.find({'movies.year': req.query.year}, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
                res.send({
                    data: results,
                    status: 200
                });
            }
        });
    });


    api.route('/years').get(function (req, res) {
       models.MovieCharacter.aggregate([
            {
                $group: {
                    _id: '$movies.year',
                    count: {$sum: 1}
                }
            },
            {
                "$sort": {"count": -1}
            },
            {"$limit": 10}
        ], function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send({
                    data: result,
                    status: 200
                });
            }
        });
    });


    return api;
};
module.exports = router();