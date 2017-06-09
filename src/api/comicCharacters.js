/**
 * Created by Ruben on 10/31/2016.
 */
var express = require('express');
var ComicCharacter = require('../models/comicCharacterModel').ComicCharacter;
var api = express.Router();


var router = function () {
    //GET actions

    api.get('/all', function (req, res) {
        ComicCharacter.find({}, 'name imgUrl description type actors._id', function (err, results) {
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


    api.get('/single', function (req, res) {
        var name = decodeURIComponent(req.query.name);
        var regex = new RegExp(name, 'i');

        ComicCharacter.findOne({name: regex}, 'name description about type imgUrl actors', function (err, character) {
            if (err) {
                console.log(err);
            } else {
                res.send({
                    data: character,
                    status: 200
                });
            }

        });

    });

    api.route('/search').get(function (req, res) {
        var term = decodeURIComponent(req.query.term);
        console.log(term);
        ComicCharacter.find({$text: {$search: term}})
            .select('name description actors._id')
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


    return api;
};
module.exports = router();