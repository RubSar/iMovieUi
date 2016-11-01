/**
 * Created by Toshiba on 10/31/2016.
 */
var express = require('express');
var MovieCharacter = require('../models/movieCharacter');

var api = express.Router();


var router = function () {
    //GET actions

    api.route('/top').get(function (req, res) {
        //implement letter
        var query = {};

        MovieCharacter.find(query).limit(10).exec(function (err, results) {
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

    api.route('/artists').get(function (req, res) {
        MovieCharacter.aggregate([
            {
                $group: {
                    _id: '$playedBy',
                    count: {$sum: 1}
                }
            },
            {
                "$sort": {"count": -1}
            },
            {"$limit": 5}
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