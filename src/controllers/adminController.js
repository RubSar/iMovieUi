/**
 * Created by User on 10/18/2016.
 */
var Character = require('../models/comicsCharacterModel');
var imdb = require('imdb-api');
var cloudinary = require('cloudinary');
var models = require('../models/movieCharacterModel');

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

    imdb.getReq({name: req.body.name.trim()}, function (err, things) {
        if (err) {
            console.log(err);
            res.render('admin/movie', {
                title: 'Continue creating new Comics',
                character: req.body.character,
                artist: req.body.artist,
                errorMessage: err.message
            });
        } else {
            Character.findOne({name: req.body.character.trim()}, function (err, character) {
                if (err) {
                    console.log(err);
                }
                else {
                    character.actors.filter(function (obj) {
                        if (obj.firstName.toLowerCase() == req.body.artist.toLowerCase()) {
                            obj.movies.push({
                                name: things.title,
                                year: things._year_data,
                                IMDbRating: parseFloat(things.rating),
                                posterUrl: things.poster
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
module.exports.createMovieCharacter = function (req, res) {
    var model = req.body;

    //if model is valid continue to next action
    if (!!model.name && !!model.playedBy && model.imageData && model.movie) {

        models.MovieCharacter.findOne({name: model.name}, function (err, character) {
            if (err) {
                console.log(err);
            } else {
                //if found character,
                if (character) {
                    res.render('admin/movieCharacter', {
                        errorMessage: 'Movie Character already exist'
                    })
                } else {
                    var newCharacter = new models.MovieCharacter();
                    newCharacter.name = req.body.name.trim();
                    newCharacter.playedBy = req.body.playedBy.trim();
                    cloudinary.uploader.upload(req.body.imageData, function (result) {
                        newCharacter.imgUrl = result.url;
                        imdb.getReq({name: req.body.movie}, function (err, movie) {
                            if (err) {
                                res.render('admin/movieCharacter', {
                                    name: newCharacter.name,
                                    playedBy: newCharacter.playedBy,
                                    errorMessage: err.message
                                })
                            } else {
                                newCharacter.movies.push({
                                    name: movie.title,
                                    year: movie.year,
                                    IMDbRating: parseFloat(movie.rating),
                                    poster: movie.poster,
                                    IMDbId: movie.imdbID
                                });
                                newCharacter.save();
                                res.render('admin/movieCharacter', {
                                    successMessage: 'new movie character created'
                                })
                            }

                        });
                    });
                }
            }
        });


    }
    //return view with error message
    else {
        res.render('admin/movieCharacter', {
            errorMessage: 'Model invalid'
        })
    }


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


module.exports.movieCharacter = function (req, res) {
    res.render('admin/movieCharacter', {
        title: 'Create new Movie Character'
    })
};

var adminController = function () {

    //home
    function index(req, res) {
        res.render('admin/index', {
            title: 'Welcome dear admin'
        });
    }

    //list movie characters
    function movieCharacters(req, res) {
        models.MovieCharacter.find({}, function (err, results) {
            res.render('admin/movieCharacters', {
                title: 'Create new Movie Character',
                movieCharacters: results
            })
        });
    }

    //list comics characters
    function comicsCharacters(req, res) {
        Character.find({}, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                res.render('admin/comicsCharacters', {
                    characters: results,
                    title: 'Comics Characters for managing'
                });
            }
        });
    }

    //create movie character

    function createMovieCharacter(req, res) {
        res.render('admin/createMovieCharacter');
    }


    return {
        index: index,
        movieCharacters: movieCharacters,
        comicsCharacters: comicsCharacters,
        createMovieCharacter: createMovieCharacter
    }
};


module.exports = adminController();

//# end GET actions







