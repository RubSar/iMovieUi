/**
 * Created by Toshiba on 11/12/2016.
 */
/**
 * Created by Toshiba on 10/31/2016.
 */
var express = require('express');
var ComicsCharacter = require('../models/comicsCharacterModel');
var User = require('../models/userModel');



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












    return api;
};
module.exports = router();