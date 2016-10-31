var express = require('express');
var homeRouter = express.Router();
var homeController =require('../controllers/homeController');

var router = function () {
    //GET actions

    //index
    homeRouter.route('/').get(function(req, res){
        return homeController.index(req,res);
    });

    homeRouter.route('comics-character/:name').get(function(req, res){
        return homeController.view(req,res);
    });

    homeRouter.route('/most-popular-movie-characters/').get(function(req, res) {
        return homeController.mostPopular(req, res);
    });

    //END GET actions

    /*
    * ----------------------------------------------------------------------------------
     */

    return homeRouter;
};
module.exports = router();

