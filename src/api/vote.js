/**
 * Created by User on 11/14/2016.
 */
var express = require('express');
var voteApi = express.Router();

var User = require('../models/movieCharacterModel').User;
var models = require('../models/comicsCharacterModel');
var ComicsCharacter =models.ComicsCharacter;
var Vote = models.Vote;

var auth = require('../services/authService');

var router = function () {

    voteApi.post('/set', function (req, res) {

        var id = auth.user(req);
        if (id) {
            User.findOne({_id: id}, function (err, user) {

                var characterQuery = {_id: req.body.characterId};
               ComicsCharacter.findOne(characterQuery).exec(function (err, character) {
                    if (err) {
                        console.log(err);
                    }
                    if (character) {
                        Vote.findOne({userId: user._id, characterId: character._id}).exec(function (err, vote) {
                            if (err) {
                                console.log(err);
                            }
                            if (vote) {
                                vote.chosen = req.body.artistId || vote.chosen;
                                vote.save();
                                res.send({
                                    message: 'updated',
                                    success: true,
                                    value: vote.chosen,
                                    status: 200
                                })
                            } else {
                                var newVote = new Vote();
                                newVote.userId = user._id;
                                newVote.characterId = req.body.characterId;
                                newVote.chosen = req.body.artistId;
                                newVote.save(function (err, doc) {
                                    character.votes.push(doc._id);
                                    user.votes.push(doc._id);
                                    user.save();
                                    character.save();
                                    res.send({
                                        message: 'created',
                                        success: true,
                                        value: newVote.chosen,
                                        status: 200
                                    })
                                });

                            }
                        });
                    }else{
                        res.send({
                            message: 'character not found',
                            success: false,
                            status: 200
                        })
                    }

                });
            });

        }
        else {
            res.send({
                status:401,
                message:'unauthenticated'
            });

        }

    });

    //voteApi.get('/rates', function (req, res) {
    //    models.Rate.find({characterId: req.query.characterId}, 'value', function (err, results) {
    //        if (err) {
    //            console.log(err);
    //        }
    //        res.send({
    //            data: results,
    //            success: true,
    //            status: 200
    //        });
    //    });
    //
    //
    //});

    //voteApi.post('/userRatesByMovies', function(req, res){
    //    var _movies =req.body.movies;
    //
    //    var id = auth.user(req);
    //    if(id){
    //        User.findOne({_id:id}, function(err, user){
    //            if (err) {
    //                console.log(err);
    //            }
    //            models.Rate.find({userId:user._id}, 'characterId value', function(err, rates){
    //                var response=[];
    //
    //                //TODO:improve implementation letter
    //                for(var i =0; i<rates.length; i++){
    //                    for(var j =0; j<_movies.length; j++){
    //                        if(rates[i].characterId==_movies[j]._id){
    //                            response.push(rates[i]);
    //                        }
    //                    }
    //                }
    //                res.send({
    //                    status:200,
    //                    success:true,
    //                    data:response
    //
    //                })
    //            })
    //        })
    //    } else{
    //        res.send({
    //            status:401,
    //            message:'unauthenticated'
    //        })
    //    }
    //});



    return voteApi;
};

module.exports = router();