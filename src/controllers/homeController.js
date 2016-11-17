
var ComicsCharacter = require('../models/comicsCharacterModel');
var models = require('../models/movieCharacterModel');

var homeController = function () {

    function index (req, res) {
        var characters ;
        ComicsCharacter.find({}, 'name imgUrl description type', function(err, results){
            if (err) {
                console.log(err);
            } else{
                characters =results;
            }
        });
        models.MovieCharacter.find({}).limit(6).exec(
            function(err, movieCharacters) {
                if (err) {
                    console.log(err);
                }
                else{
                    res.render('index', {
                        characters:characters,
                        movieCharacters:movieCharacters
                    });
                }
            }
        );
    }

    function movieCharacter(req, res){
      //  models.MovieCharacter.findOne({name:req.params})
        res.render('movieCharacter', {
            title:'movie character ' +req.params.name
        });
    }

    function  view(req, res){
        console.log(req.params.name);
        ComicsCharacter.findOne({name:req.params.name}, function(err, result){
            if (err) {
                console.log(err);
            } else{
                res.render('view', {
                    character:result
                });
            }
        });
    }
    function mostPopular(req, res){
        res.render('mostPopular');
    }

    return {
        index: index,
        view:view,
        mostPopular:mostPopular,
        movieCharacter:movieCharacter
    };
};

module.exports = homeController();