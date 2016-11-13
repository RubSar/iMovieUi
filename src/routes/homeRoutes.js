var express = require('express');
var jwt = require('jwt-simple');
var homeRouter = express.Router();
var homeController = require('../controllers/homeController.js');
var keys = require('../config/keys.js');

var router = function () {
    //GET actions

    //index
    homeRouter.route('/').get(function (req, res) {
        return homeController.index(req, res);
    });

    homeRouter.get('/comics-character/:name', function (req, res) {
        return homeController.view(req, res);
    });


    homeRouter.get('/most-popular-movie-characters/', isAuthenticated, function (req, res) {
        return homeController.mostPopular(req, res);
    });


    function isAuthenticated(req, res, next) {

        next(null, req, res);
    }


    //END GET actions

    /*
     * ----------------------------------------------------------------------------------
     */

    return homeRouter;
};
module.exports = router();

