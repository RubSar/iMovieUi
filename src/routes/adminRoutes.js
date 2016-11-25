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

    //create new  movie for  artist
    adminRouter.route('/movie/create').post(function (req, res) {
        return adminController.createMovie(req, res);
    });

    //create new movie character
    adminRouter.route('/movieCharacter/create').post(function (req, res) {
        return adminController.createMovieCharacter(req, res);
    });

    // # end POST actions

    /*
     * -----------------------------------------------------------------------
     */



    //# GET actions

    ////index
    //adminRouter.get('/notFound', function (req, res) {
    //    return adminController.notFound(req, res);
    //});


    //index
    adminRouter.get('/', function (req, res) {
        return adminController.index(req, res);
    });

    //comicsCharacters
    adminRouter.get('/comicsCharacters', function (req, res) {
        return adminController.comicsCharacters(req, res);
    });

    adminRouter.get('/movieCharacters', function (req, res) {
        return adminController.movieCharacters(req, res);
    });
    adminRouter.get('/create/movieCharacter', function (req, res) {
        return adminController.createMovieCharacter(req, res);
    });
    adminRouter.post('/create/movieCharacter', function (req, res) {
        return adminController.saveMovieCharacter(req, res);
    });

    adminRouter.get('/edit/movieCharacter/:id', function (req, res) {
        return adminController.editMovieCharacter(req, res);
    });
    adminRouter.post('/edit/movieCharacter/info', function (req, res) {
        return adminController.updateMovieCharacterInfo(req, res);
    });
    adminRouter.post('/edit/movieCharacter/image', function (req, res) {
        return adminController.updateMovieCharacter(req, res);
    });

    adminRouter.route('/new').get(function (req, res) {
        return adminController.character(req, res);
    });

    adminRouter.route('/new/:character').get(function (req, res) {
        return adminController.artist(req, res);
    });

    adminRouter.route('/new/:character/:artist').get(function (req, res) {
        return adminController.movie(req, res);
    });


    //# end GET actions

    return adminRouter;
};

module.exports = router();