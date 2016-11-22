/**
 * Created by Toshiba on 10/31/2016.
 */
var express = require('express');
var models = require('../models/movieCharacterModel');
var api = express.Router();
var auth =require('../services/authService');


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
            .limit(10)
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

    api.route('/list').get(function (req, res) {
        var paging = req.query;
        var size = parseInt(paging.size) || 10;
        var number = parseInt(paging.number) || 1;
        models.MovieCharacter.find({})
            .populate('rates', 'value')
            .limit(size)
            .skip((number-1)*size)
            .exec(function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    models.MovieCharacter.count({}, function (err, count) {
                        if (err) {
                            console.log(err);
                        }
                        res.send({
                            data: results,
                            count: count,
                            status: 200,
                            paging:{
                                number:number,
                                size:size
                            }
                        });

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
                console.log(err);
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
                    res.send({
                        data: results,
                        status: 200
                    });
                }
            });
    });

    api.route('/byMovie').get(function (req, res) {
        models.MovieCharacter.find({'movies.name': req.query.movieName})
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

    //get top years
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

    //get top movies
    api.route('/movies').get(function (req, res) {
        models.MovieCharacter.aggregate([
            {
                $group: {
                    _id: '$movies.name',
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
                    success:true,
                    status: 200
                });
            }
        });
    });

    //get single character
    api.route('/single').get(function(req, res){
        var url = decodeURIComponent(req.query.name);
        var id = auth.user(req);
        console.log(id);

        models.MovieCharacter.findOne({name:url})
             .populate('rates', 'value')
             .exec(function(err, result){
                if(id){
                    models.Rate.findOne({userId: id, characterId:result._id}, function(err, rate){
                        res.send({
                               character:result,
                               userRate:!!rate? rate.value: null,
                               success:true,
                               status:200
                           })
                        });
                }else{
                    res.send({
                        character:result,
                        success:true,
                        status:200
                    });
                }

        });


    });


    return api;
};
module.exports = router();