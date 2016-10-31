
var Character = require('../models/characterModel');
var MovieCharacter = require('../models/movieCharacter');

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
        MovieCharacter.find({}).limit(60).exec(
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
        Character.find({name:req.params.name}, function(err, results){
            if (err) {
                console.log(err);
            } else{
                console.log(results[0]);
                res.render('view', {
                    character:results[0]
                });
            }
        });
    }

    return {
        index: index,
        view:view
    };
};

module.exports = homeController();