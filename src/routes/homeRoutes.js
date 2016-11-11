var express = require('express');
var homeRouter = express.Router();
var homeController = require('../controllers/homeController');

var router = function () {
    //GET actions

    //index
    homeRouter.route('/').get(function (req, res) {
        console.log(req.headers)
        return homeController.index(req, res);
    });

    homeRouter.get('comics-character/:name', function (req, res) {
        return homeController.view(req, res);
    });


    homeRouter.get('/most-popular-movie-characters/', isAuthenticated, function (req, res) {
        console.log(req.headers);
        console.log(req.headers['Authorization']);
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

