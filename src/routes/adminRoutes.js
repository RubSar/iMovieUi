var express = require('express');
var adminRouter = express.Router();
var adminController = require('../controllers/adminController.js');

var router = function () {

    //# POST actions

    //create new character
    adminRouter.route('/character/create').post(function (req, res) {
        return adminController.createCharacter(req, res);
    });

    //create new  artist for  character
    adminRouter.route('/artist/create').post(function (req, res) {
        return adminController.createArtist(req, res);
    });

    //create new  artist for  character
    adminRouter.route('/movie/create').post(function (req, res) {
        return adminController.createMovie(req, res);
    });

    // # end POST actions

    /*
     * -----------------------------------------------------------------------
     */



    //# GET actions


    adminRouter.route('/new').get(function (req, res) {
        return adminController.character(req, res);
    });

    adminRouter.route('/new/:character').get(function (req, res) {
        return adminController.artist(req, res);
    });

    adminRouter.route('/new/:character/:artist').get(function (req, res) {
        return adminController.movie(req, res);
    });


    adminRouter.route('/').get(function (req, res) {
        return adminController.index(req, res);
    });

    //# end GET actions

    return adminRouter;
};

module.exports = router();