/**
 * Created by Toshiba on 10/31/2016.
 */
var express = require('express');
var models = require('../models/movieCharacterModel');
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
        models.MovieCharacter.find({})
            .populate('rates', 'value')
            .exec(function (err, results) {
                if (err) {
                    console.log(err);
                } else {
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
        models.MovieCharacter.find({playedBy: req.query.artist})
            .populate('rates', 'value')
            .exec(function (err, results) {
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
        models.MovieCharacter.find({'movies.year': req.query.year})
            .populate('rates', 'value')
            .exec(function (err, results) {
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