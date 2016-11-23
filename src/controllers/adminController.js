/**
 * Created by User on 10/18/2016.
 */
var Character = require('../models/comicsCharacterModel');
var imdb = require('imdb-api');
var cloudinary = require('cloudinary');
var models =require('../models/movieCharacterModel');

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
    Character.findOne({name: req.body.name.trim()}, function (err, result) {
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
                    res.redirect('/admin/new/' + req.body.name.trim());
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
            res.redirect('/admin/new/' + req.body.name.trim());
        }
    });
};

//create new artist
module.exports.createArtist = function (req, res) {


    Character.findOne({name: req.body.character.trim()}, function (err, character) {
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
            res.redirect('/admin/new/' + req.body.character.trim() + '/' + req.body.firstName.trim())
        }
    });
};

//create new movie
module.exports.createMovie = function (req, res) {

    imdb.getReq({name:req.body.name.trim()},function(err, things){
        if (err) {
            console.log(err);
            res.render('admin/movie', {
                title: 'Continue creating new Comics',
                character: req.body.character,
                artist: req.body.artist,
                errorMessage:err.message
            });
        } else{
                Character.findOne({name: req.body.character.trim()}, function (err, character) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        character.actors.filter(function(obj){
                            if (obj.firstName.toLowerCase() == req.body.artist.toLowerCase()) {
                                obj.movies.push({
                                    name: things.title,
                                    year:things._year_data,
                                    IMDbRating: parseFloat(things.rating),
                                    posterUrl:things.poster
                                })

                            }
                        });
                        character.save();
                        res.redirect('/admin');
                    }
                });
            }
    });

};

//TODO: improve implementation letter
//check if exist before create new character
module.exports.createMovieCharacter = function (req, res){
    var newMovieCharacter = new models.MovieCharacter();
    newMovieCharacter.name =req.body.name.trim();
    newMovieCharacter.playedBy =req.body.playedBy.trim();
    console.log(req.body.imageData);
    cloudinary.uploader.upload(req.body.imageData, function(result){
        newMovieCharacter.imgUrl =result.url;
        imdb.getReq({name:req.body.movie},function(err, movie) {
            if (err) {
                res.render('admin/movieCharacter', {
                    name:newMovieCharacter.name,
                    playedBy:newMovieCharacter.playedBy,
                    errorMessage:err.message
                })
            }else{
                newMovieCharacter.movies.push({
                    name: movie.title,
                    year:movie.year,
                    IMDbRating: parseFloat(movie.rating),
                    poster:movie.poster,
                    IMDbId:movie.imdbID
                });
                newMovieCharacter.save();
                res.render('admin/movieCharacter')
            }

        });
    });

};



// # end POST actions

/**
 * -----------------------------------------------------------------------
 */


    //# GET actions


module.exports.character = function (req, res) {
    res.render('admin/character', {
        title: 'Welcome back'
    });
};


module.exports.artist = function (req, res) {
    res.render('admin/artist', {
        title: 'Continue creating new Comics',
        character: req.params.character
    });
};

module.exports.movie = function (req, res) {
    res.render('admin/movie', {
        title: 'Continue creating new Comics',
        character: req.params.character,
        artist: req.params.artist
    });
};



module.exports.index = function (req, res) {

    Character.find({}, function(err, results){
        if (err) {
            console.log(err);
        } else{
            res.render('admin/index', {
                characters: results,
                title:'three view'
            });
        }
    });

};

module.exports.movieCharacter = function(req, res){
    res.render('admin/movieCharacter', {
        title:'Create new Movie Character'
    })
};


//# end GET actions







