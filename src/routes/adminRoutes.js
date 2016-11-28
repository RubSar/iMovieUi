var express = require('express');
var adminRouter = express.Router();


var adminController = require('../controllers/adminController.js');
var Admin = require('../models/adminModel.js');

module.exports = function (app, passport) {

    function isLoggedIn(req, res, next) {
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

    adminRouter.get('/movieCharacters', isLoggedIn, function (req, res) {
        return adminController.movieCharacters(req, res);
    });
    adminRouter.get('/create/movieCharacter', isLoggedIn, function (req, res) {
        return adminController.createMovieCharacter(req, res);
    });
    adminRouter.post('/create/movieCharacter', isLoggedIn, function (req, res) {
        return adminController.saveMovieCharacter(req, res);
    });

    adminRouter.get('/edit/movieCharacter/:id', isLoggedIn, function (req, res) {
        return adminController.editMovieCharacter(req, res);
    });
    adminRouter.post('/edit/movieCharacter/info', isLoggedIn, function (req, res) {
        return adminController.updateMovieCharacterInfo(req, res);
    });
    adminRouter.post('/edit/movieCharacter/image', isLoggedIn, function (req, res) {
        return adminController.updateMovieCharacterImage(req, res);
    });

    //END Movie Character Actions
    //------------------------------------------------------------------------------------------------------------
    //
    //************************************************************************************************************
    //
    //------------------------------------------------------------------------------------------------------------
    //START Comics Character Actions

    adminRouter.get('/comicsCharacters', isLoggedIn, function (req, res) {
        return adminController.comicsCharacters(req, res);
    });

    adminRouter.get('/create/comicsCharacter', isLoggedIn, function (req, res) {
        return adminController.createComicsCharacter(req, res);
    });

    adminRouter.post('/create/comicsCharacter', isLoggedIn, function (req, res) {
        return adminController.saveComicsCharacter(req, res);
    });
    adminRouter.get('/create/:comicsCharacter/artist', isLoggedIn, function (req, res) {
        return adminController.createComicsCharacterArtist(req, res);
    });
    adminRouter.post('/create/:comicsCharacter/artist', isLoggedIn, function (req, res) {
        return adminController.saveComicsCharacterArtist(req, res);
    });

    adminRouter.get('/create/:comicsCharacter/:artist/movie', isLoggedIn, function (req, res) {
        return adminController.createArtistMovie(req, res);
    });

    adminRouter.post('/create/:comicsCharacter/:artist/movie', isLoggedIn, function (req, res) {
        return adminController.saveArtistMovie(req, res);
    });

    //END Comics Character Actions
    //------------------------------------------------------------------------------------------------------------

    return adminRouter;
};
