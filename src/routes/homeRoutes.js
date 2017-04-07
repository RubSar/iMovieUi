//var express = require('express');
//var jwt = require('jwt-simple');
//var homeRouter = express.Router();
//var homeController = require('../controllers/homeController.js');
//var keys = require('../config/keys.js');

//var router = function (app) {
//
//    //index
//    //homeRouter.route('/').get(function (req, res) {
//    //    return homeController.index(req, res);
//    //});
//    //
//    //homeRouter.get('/comics-character/:name', function (req, res) {
//    //    return homeController.comicsCharacter(req, res);
//    //});
//    //
//    //
//    //homeRouter.get('/most-popular-movie-characters/:term?',  function (req, res) {
//    //    return homeController.movieCharactersList(req, res);
//    //});
//    //
//    //homeRouter.get('/movie-character/:name',  function (req, res) {
//    //    return homeController.movieCharacter(req, res);
//    //});
//    //homeRouter.get('/myRates',  function (req, res) {
//    //    return homeController.userRates(req, res);
//    //});
//    app.get('*', function(req, res) {
//        res.sendfile('./views/index.html');
//    });
//
//    module.exports = function(app) {
//        app.get('*', function(req, res) {
//            res.sendfile('./index.html'); // load our public/index.html file
//        });
//
//    };
//
//
//
//    return homeRouter;
//};
//module.exports = router();
module.exports = function(app) {
    app.get('*', function(req, res) {
        console.log('-----------------------------');
        res.sendfile('./public/index.html'); // load our public/index.html file
    });
};

