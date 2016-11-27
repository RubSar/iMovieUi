var express = require('express');
var adminRouter = express.Router();
var adminController = require('../controllers/adminController.js');

var router = function () {

    //index
    adminRouter.get('/', function (req, res) {
        return adminController.index(req, res);
    });

    //------------------------------------------------------------------------------------------------------------
    //START Movie Character Actions

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
        return adminController.updateMovieCharacterImage(req, res);
    });

    //END Movie Character Actions
    //------------------------------------------------------------------------------------------------------------
    //
    //************************************************************************************************************
    //
    //------------------------------------------------------------------------------------------------------------
    //START Comics Character Actions

    adminRouter.get('/comicsCharacters', function (req, res) {
        return adminController.comicsCharacters(req, res);
    });

    adminRouter.get('/create/comicsCharacter', function (req, res) {
        return adminController.createComicsCharacter(req, res);
    });

    adminRouter.post('/create/comicsCharacter', function (req, res) {
        return adminController.saveComicsCharacter(req, res);
    });
    adminRouter.get('/create/:comicsCharacter/artist', function (req, res) {
        return adminController.createComicsCharacterArtist(req, res);
    });
    adminRouter.post('/create/:comicsCharacter/artist', function (req, res) {
        return adminController.saveComicsCharacterArtist(req, res);
    });

    adminRouter.get('/create/:comicsCharacter/:artist/movie', function (req, res) {
        return adminController.createArtistMovie(req, res);
    });

    adminRouter.post('/create/:comicsCharacter/:artist/movie', function (req, res) {
        return adminController.saveArtistMovie(req, res);
    });

    //END Comics Character Actions
    //------------------------------------------------------------------------------------------------------------

    return adminRouter;
};

module.exports = router();