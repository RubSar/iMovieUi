
var Character = require('../models/characterModel');
var MovieCharacter = require('../models/movieCharacterModel');

var homeController = function () {

    function index (req, res) {
        var characters ;
        Character.find({}, 'name imgUrl description type', function(err, results){
            if (err) {
                console.log(err);
            } else{
                console.log(results);
                characters =results;
            }
        });
        MovieCharacter.find({}).limit(6).exec(
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



    function  view(req, res){
        console.log(req.params.name);
        Character.findOne({name:req.params.name}, function(err, result){
            if (err) {
                console.log(err);
            } else{
                console.log(result);
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
        mostPopular:mostPopular
    };
};

module.exports = homeController();