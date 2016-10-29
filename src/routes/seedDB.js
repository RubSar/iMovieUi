/**
 * Created by User on 10/26/2016.
 */
var express = require('express');
var mongoose = require('mongoose');
var seedRouter = express.Router();
var imdb = require('imdb-api');
var Character = require('../models/characterModel');


seedRouter.route('/change/poster').get(function (req, res) {
    Character.find({}, function (err, results) {
        results.forEach(function (character) {

            character.actors.forEach(function (actor) {
                console.log(actor);
                actor.movies.forEach(function(movie){
                    console.log(movie);

                    imdb.getReq({ name: movie.name }, function(err, things) {
                        if (err) {
                            console.log(err);
                        }else{
                            movie.posterUrl =things.poster;
                            movie.IMDbRating =things.rating;
                            movie.save();
                            console.log(movie.posterUrl);
                        }

                    });
                });
                actor.save();
            });
            character.save();
        });
        res.send(results);
    });
});



module.exports = seedRouter;

