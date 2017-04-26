
/**
 * Created by Ruben on 10/31/2016.
 */
var express = require('express');
var ComicsCharacter = require('../models/comicsCharacterModel').ComicsCharacter;
var api = express.Router();


var router = function () {
    //GET actions

    api.get('/all', function (req, res) {
        ComicsCharacter.find({}, 'name imgUrl description type actors._id', function (err, results) {
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

        ComicsCharacter.findOne({name: regex},'name description type imgUrl actors', function (err, character) {
                res.send({
                    data: character,
                    status: 200
                });

            });

    });

    api.route('/search').get(function (req, res) {
        var term = decodeURIComponent(req.query.term);
        console.log(term);
        ComicsCharacter.find({$text: {$search: term}})
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