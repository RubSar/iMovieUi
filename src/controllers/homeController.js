
var ComicsCharacter = require('../models/comicsCharacterModel');
var models = require('../models/movieCharacterModel');

var homeController = function () {

    function index (req, res) {
        ComicsCharacter.find({}, 'name imgUrl description type', function(err, results){
            if (err) {
                console.log(err);
            } else{
               res.render('index',{
                   characters:results
               })
            }
        });

    }

    function movieCharacter(req, res){
        res.render('movieCharacter', {
            title:'movie character ' +req.params.name
        });
    }

    function comicsCharacter(req, res){
        res.render('comicsCharacter');
    }
    function movieCharactersList(req, res){
        res.render('movieCharactersList');
    }

    function userRates(req, res){
        res.render('userRates');
    }

    return {
        index: index,
        comicsCharacter:comicsCharacter,
        movieCharacter:movieCharacter,
        movieCharactersList:movieCharactersList,
        userRates:userRates

    };
};

module.exports = homeController();