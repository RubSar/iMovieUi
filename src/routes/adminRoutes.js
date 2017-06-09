var express = require('express');
var adminRouter = express.Router();


var adminController = require('../controllers/adminController.js');
var Admin = require('../models/adminModel.js');

module.exports = function (app, passport) {

    function isLoggedIn(req, res, next) {
        console.log('not logged in');
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/admin/login');
    }



    adminRouter.get('/', isLoggedIn, function (req, res) {
        return adminController.index(req, res);
    });

    //-----------------------------------------------------------------------------------------------------------
    //START Admin actions

    //login
    adminRouter.get('/login',  function (req, res) {
        res.render('admin/login');
    });

    adminRouter.post('/login', passport.authenticate('local-login', {
        successRedirect : '/admin', // redirect to the secure profile section
        failureRedirect : '/admin/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    adminRouter.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/admin/login');
    });

    //------------------------------------------------------------------------------------------------------------
    //START Movie Character Actions

    adminRouter.get('/characters', isLoggedIn, function (req, res) {
        return adminController.movieCharacters(req, res);
    });
    adminRouter.get('/create/character', isLoggedIn, function (req, res) {
        return adminController.createMovieCharacter(req, res);
    });
    adminRouter.post('/create/character', isLoggedIn, function (req, res) {
        return adminController.saveMovieCharacter(req, res);
    });

    adminRouter.get('/edit/character/:id', isLoggedIn, function (req, res) {
        return adminController.editMovieCharacter(req, res);
    });
    adminRouter.post('/edit/character/info', isLoggedIn, function (req, res) {
        return adminController.updateMovieCharacterInfo(req, res);
    });
    adminRouter.post('/edit/character/image', isLoggedIn, function (req, res) {
        return adminController.updateMovieCharacterImage(req, res);
    });

    //END Movie Character Actions
    //------------------------------------------------------------------------------------------------------------
    //
    //************************************************************************************************************
    //
    //------------------------------------------------------------------------------------------------------------
    //START Comic Character Actions

    adminRouter.get('/comicCharacters', isLoggedIn, function (req, res) {

        return adminController.comicCharacters(req, res);
    });

    adminRouter.get('/create/comicCharacter', isLoggedIn, function (req, res) {
        return adminController.createComicCharacter(req, res);
    });

    adminRouter.post('/create/comicCharacter', isLoggedIn, function (req, res) {
        return adminController.saveComicCharacter(req, res);
    });

    adminRouter.get('/edit/comicCharacter/:id', isLoggedIn, function (req, res) {
        return adminController.editComicCharacter(req, res);
    });
    adminRouter.post('/edit/comicCharacter', isLoggedIn, function (req, res) {
        return adminController.updateComicCharacterInfo(req, res);
    });

    adminRouter.get('/create/:comicCharacter/artist', isLoggedIn, function (req, res) {
        return adminController.createComicCharacterArtist(req, res);
    });
    adminRouter.post('/create/:comicCharacter/artist', isLoggedIn, function (req, res) {
        return adminController.saveComicCharacterArtist(req, res);
    });

    adminRouter.get('/edit/:comicCharacterId/artist/:artistId', isLoggedIn, function (req, res) {
        return adminController.editComicCharacterArtist(req, res);
    });
    adminRouter.post('/edit/comicCharacter/artistInfo', isLoggedIn, function (req, res) {
        return adminController.updateComicCharacterArtistInfo(req, res);
    });
    ///


    adminRouter.get('/create/:comicCharacter/:artist/movie', isLoggedIn, function (req, res) {
        return adminController.createArtistMovie(req, res);
    });

    adminRouter.post('/create/:comicCharacter/:artist/movie', isLoggedIn, function (req, res) {
        return adminController.saveArtistMovie(req, res);
    });

    //END Comic Character Actions
    //------------------------------------------------------------------------------------------------------------

    return adminRouter;
};
