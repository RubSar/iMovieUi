var express = require('express');
var jwt = require('jwt-simple');
var homeRouter = express.Router();
var homeController = require('../controllers/homeController.js');
var keys = require('../config/keys.js');

var router = function () {

    //index
    homeRouter.route('/').get(function (req, res) {
        return homeController.index(req, res);
    });

    homeRouter.get('/comics-character/:name', function (req, res) {
        return homeController.comicsCharacter(req, res);
    });


    homeRouter.get('/most-popular-movie-characters/:term?',  function (req, res) {
        return homeController.movieCharactersList(req, res);
    });

    homeRouter.get('/movie-character/:name',  function (req, res) {
        return homeController.movieCharacter(req, res);
    });
    homeRouter.get('/myRates',  function (req, res) {
        return homeController.userRates(req, res);
    });



    return homeRouter;
};
module.exports = router();

