/**
 * Created by Toshiba on 11/12/2016.
 */
/**
 * Created by Toshiba on 10/31/2016.
 */
var express = require('express');
var ComicsCharacter = require('../models/comicsCharacterModel').ComicsCharacter;
var api = express.Router();


var router = function () {
    //GET actions

    api.get('/all', function (req, res) {
        ComicsCharacter.find({}, 'name imgUrl description type', function (err, results) {
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

        ComicsCharacter.findOne({name: name})
            .populate({path: 'votes', select: 'chosen'})
            .exec(function (err, character) {
                var groupBy = function(xs, key) {
                    return xs.reduce(function(rv, x) {
                        (rv[x[key]] = rv[x[key]] || []).push(x);
                        return rv;
                    }, {});
                };
                character.votes.forEach(function(item){

                });
                res.send({
                    data: character,
                    status: 200
                });

            });

    });


    return api;
};
module.exports = router();