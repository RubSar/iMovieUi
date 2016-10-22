/**
 * Created by User on 10/18/2016.
 */
var Character = require('../models/characterModel');

//middleware
var middleware = function (req, res, next) {
    //if (!req.user) {
    //res.redirect('/');
    //}
    next();
};


//# POST actions

//create new charcater
module.exports.createCharacter = function (req, res) {
    Character.findOne({name: req.body.name}, function (err, result) {
        console.log(result);
        if (err) {
            console.log(err);
        }
        else if (result) {
            result.description = req.body.description;
            result.imgUrl = req.body.imgUrl;
            result.type = req.body.type;
            result.sex = req.body.sex;
            result.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/admin/new/' + req.body.name);
                }
            });
        } else {
            var entry = new Character({
                name: req.body.name,
                description: req.body.description,
                imgUrl: req.body.imgUrl,
                type: req.body.type,
                sex: req.body.sex
            });
            entry.save();
            res.redirect('/admin/new/' + req.body.name);
        }
    });
};

//create new artist
module.exports.createArtist = function (req, res) {


    Character.findOne({name: req.body.character}, function (err, character) {
        if (err) {
            console.log(err);
        }
        else {
            var newActor = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age
            };
            character.actors.push(newActor);
            character.save();
            res.redirect('/admin/new/' + req.body.character + '/' + req.body.firstName)
        }
    });
};

//create new movie
module.exports.createMovie = function (req, res) {
    var query = {
        name: req.body.character,
        'actors.firstName': req.body.artist
    };
    console.log(query);
    Character.findOne(query, function (err, character) {
        if (err) {
            console.log(err);
        }
        else {
            character.actors.filter(function(obj){
                if (obj.firstName.toLowerCase() == req.body.artist.toLowerCase()) {
                    obj.movies.push({
                        name: req.body.name,
                        year: req.body.year
                    })
                }
            });
            character.save();
            console.log(character);
            res.render('jsonView', {
                character:character
            })
        }
    });
};


// # end POST actions

/**
 * -----------------------------------------------------------------------
 */


    //# GET actions


module.exports.character = function (req, res) {
    res.render('character', {
        title: 'Welcome back'
    });
};


module.exports.artist = function (req, res) {
    res.render('artist', {
        title: 'Continue creating new Comics',
        character: req.params.character
    });
};

module.exports.movie = function (req, res) {
    res.render('movie', {
        title: 'Continue creating new Comics',
        character: req.params.character,
        artist: req.params.artist
    });
};


//# end GET actions







