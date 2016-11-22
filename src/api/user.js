/**
 * Created by Toshiba on 11/22/2016.
 */
var express = require('express');
var models = require('../models/movieCharacterModel');
var api = express.Router();
var auth =require('../services/authService');





var router = function () {
    //GET actions

    api.get('/rates', function (req, res) {
        var id = auth.user(req);
        //if (id) {
        //    models.MovieCharacter.find({})
        //        .populate('rates', 'value')
        //        .exec(function(err, results){
        //            if (err) {
        //                console.log(err);
        //            }else{
        //                entries = results.filter(function(character) {
        //                    return character.rates.userId ;
        //                });
        //            }
        //        });
        //
        //}
        res.send({
            status:200,
            success:true,
            message:'Sorry i didn\'t now how implement it yet'
        })

    });




    return api;
};
module.exports = router();