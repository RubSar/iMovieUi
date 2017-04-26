/**
 * Created by Ruben on 10/31/2016.
 */
var express = require('express');
var models = require('../models/movieCharacterModel');
var api = express.Router();
var auth = require('../services/authService');


var router = function () {
    //GET actions

    api.route('/top').get(function (req, res) {
        models.MovieCharacter.find({type:'tv-series'})
            .sort({ratesCount: -1, ratesValue: -1})
            .limit(10)
            .select('name playedBy imgUrl movies ratesCount ratesValue ')
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




    api.route('/search').get(function (req, res) {
        var term = decodeURIComponent(req.query.term);
        models.MovieCharacter.find({$text: {$search: term}})
            .select('name playedBy imgUrl movies ratesCount ratesValue ')
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
        var body = req.query;
        var key = body.key;
        var value = body.value;
        var query = {
            type:'tv-series'
        };
        var page = parseInt(body.page);
        if (key) {
            query[key] = value;
        }

        models.MovieCharacter.find(query)
            .sort({ratesValue: -1, ratesCount: 1})
            .select('name playedBy imgUrl movies ratesCount ratesValue ')
            .limit(10)
            .skip((page - 1) * 10)
            .exec(function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    models.MovieCharacter.count(query, function (err, count) {
                        if (err) {
                            console.log(err);
                        }
                        res.send({
                            success: true,
                            data: results,
                            count: count
                        });

                    });
                }
            })
    });


    //get top movies
    api.route('/movies').get(function (req, res) {
        models.MovieCharacter.aggregate([
            {$match:{type:'tv-series'}},
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
                    success: true,
                    status: 200
                });
            }
        });
    });

    //get single character
    api.route('/single').get(function (req, res) {
        var url = decodeURIComponent(req.query.name);

        var name = url.split(' by ')[0];
        var playedBy = url.split(' by ')[1];
        var nameReg = new RegExp(name, 'i');
        var playedByReg = new RegExp(playedBy, 'i');

        var id = auth.user(req);

        models.MovieCharacter.findOne({name: nameReg, playedBy: playedByReg})
            .select('name playedBy imgUrl about movies ratesCount ratesValue ')
            .exec(function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if (result) {
                        if (id) {
                            models.Rate.findOne({userId: id, characterId: result._id}, function (err, rate) {
                                res.send({
                                    character: result,
                                    userRate: !!rate ? rate.value : null,
                                    success: true,
                                    status: 200
                                })
                            });
                        } else {
                            res.send({
                                character: result,
                                success: true,
                                status: 200
                            });
                        }
                    } else {
                        res.send({
                            success: false,
                            message: url,
                            status: 200
                        });
                    }
                }

            });
    });

    api.route('/recommended').get(function (req, res) {

        var model = req.query;

        //TODO: improve implementation letter
        models.MovieCharacter.find({$or: [{'movies.name': model.movie}, {playedBy: model.artist}]})
            .limit(3)
            .select('name playedBy imgUrl movies')
            .exec(function (err, result) {


                var retModel = [];
                for (var i = 0; i < result.length; i++) {
                    if (result[i].playedBy == model.artist && result[i].movies[0].name == model.movie) {
                        //do nothing
                    } else {
                        retModel.push(result[i]);
                    }
                }

                models.MovieCharacter.find({'movies.year': model.year})
                    .limit(5)
                    .select('name playedBy imgUrl movies')
                    .exec(function (err, yResult) {

                        for (var i = 0; i < yResult.length; i++) {
                            if (yResult[i].playedBy == model.artist && yResult[i].movies[0].name == model.movie) {
                                //do nothing
                            } else {
                                var duplicate = retModel.filter(function (obj) {
                                    return obj.name == yResult[i].name;
                                });

                                if (duplicate.length == 0) {
                                    retModel.push(yResult[i]);
                                }

                            }
                        }

                        if (retModel.length < 4) {
                            var additionalCount = 6 - retModel.length;

                            models.MovieCharacter.find({})
                                .sort({ratesCount: -1, ratesValue: -1})
                                .limit(additionalCount)
                                .select('name playedBy imgUrl movies')
                                .exec(function (err, topResult) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    retModel = retModel.concat(topResult);
                                    res.send({
                                        data: retModel,
                                        success: true,
                                        status: 200
                                    });
                                });
                        } else {
                            res.send({
                                data: retModel,
                                success: true,
                                status: 200
                            });
                        }

                    });

            });


    });

    return api;
};
module.exports = router();