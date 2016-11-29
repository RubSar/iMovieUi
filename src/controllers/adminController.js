/**
 * Created by User on 10/18/2016.
 */
var ComicsCharacter = require('../models/comicsCharacterModel').ComicsCharacter;
var imdb = require('imdb-api');
var cloudinary = require('cloudinary');
var MovieCharacter = require('../models/movieCharacterModel').MovieCharacter;


var adminController = function () {

    //home
    function index(req, res) {
        res.render('admin/index', {
            title: 'Welcome dear admin'
        });
    }


    //---------------------------------------------------------------------------------------------------------------
    // START Movie Characters Actions

    //list movie characters
    function movieCharacters(req, res) {
        MovieCharacter.find({}, function (err, results) {
            res.render('admin/movieCharacters', {
                title: 'Manage Movie Character',
                movieCharacters: results
            })
        });
    }

    //create movie character
    function createMovieCharacter(req, res) {
        res.render('admin/createMovieCharacter');
    }

    //save comics character
    function saveMovieCharacter(req, res) {
        var model = req.body;
        //if model is valid continue to next action
        if (!!model.name && !!model.playedBy && model.imageData && model.movie) {

            MovieCharacter.findOne({name: model.name}, function (err, character) {
                if (err) {
                    console.log(err);
                } else {
                    //if found character,
                    if (character) {
                        res.redirect('/admin/edit/movieCharacter/'+character._id)
                    } else {
                        var newCharacter = new MovieCharacter();
                        newCharacter.name = req.body.name.trim();
                        newCharacter.playedBy = req.body.playedBy.trim();
                        cloudinary.uploader.upload(req.body.imageData, function (result) {
                            newCharacter.imgUrl = result.url;
                            imdb.getReq({name: req.body.movie}, function (err, movie) {
                                if (err) {
                                    res.render('admin/createMovieCharacter', {
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
                                    res.redirect('/admin/movieCharacters')
                                }

                            });
                        });
                    }
                }
            });


        }
        //return view with error message
        else {
            res.render('admin/createMovieCharacter', {
                name:model.name,
                playedBy:model.playedBy,
                movie:model.movie,
                errorMessage: 'Model invalid'
            })
        }

    }

    //edit movie character
    function editMovieCharacter(req, res) {
        var id = req.params.id;
        MovieCharacter.findOne({_id: id}, '_id name playedBy imgUrl movies.name ', function (err, result) {
            if (err) {
                console.log(err);
            } else {
                if (result) {
                    console.log(result);
                    res.render('admin/editMovieCharacter', {
                        movieCharacter: result
                    });
                } else {
                    res.render('admin/notFound', {
                        message: 'Sorry the Movie character that You looking for not found'
                    });
                }
            }
        });

    }

    //update movie character info
    function updateMovieCharacterInfo(req, res) {
        var model = req.body;
        MovieCharacter.findOne({_id: model.id}, function (err, character) {
            if (err) {
                console.log(err);
            } else {
                //if found character,
                if (character) {
                   character.name= model.name || character.name;
                   character.playedBy= model.playedBy || character.playedBy;
                   if(character.movies[0].name.trim()!== model.movie.trim()){
                        imdb.getReq({name: model.movie}, function (err, movie) {
                            if (err) {
                                console.log(err);
                                res.send({
                                   errorMessage:err
                                })
                            }else{
                                character.movies= [];
                                character.movies.push({
                                    name: movie.title,
                                    year: movie.year,
                                    IMDbRating: parseFloat(movie.rating),
                                    poster: movie.poster,
                                    IMDbId: movie.imdburl
                                });

                                character.save();
                                res.redirect('/admin/movieCharacters')
                            }

                        })
                    }else{
                       character.save();
                       res.redirect('/admin/movieCharacters')
                   }


                    }

                }
        });
    }

    //update movie character image
    function updateMovieCharacterImage(req, res){
        var body = req.body;
        MovieCharacter.findOne({_id:body.id}, function(err, character){
            if (err) {
                console.log(err);
            }else{
                if (character) {
                    cloudinary.uploader.upload(body.imageData, function(image){
                        cloudinary.uploader.destroy(character.imgUrl, function(result){
                            console.log(result);
                            character.imgUrl =image.url;
                            character.save();
                            res.redirect('/admin/movieCharacters')
                        })
                    })
                }
            }
        })
    }

    // END Movie Characters Actions
    //-----------------------------------------------------------------------------------------------------------------
    //
    //*****************************************************************************************************************
    //
    //-----------------------------------------------------------------------------------------------------------------
    //START Comics Characters Actions


    //list comics characters
    function comicsCharacters(req, res) {
        ComicsCharacter.find({}, function (err, results) {
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

    //create comics Character
    function createComicsCharacter(req, res){
        res.render('admin/createComicsCharacter')
    }

    //save comics character
    function saveComicsCharacter(req, res){
        var model = req.body;
        if (model.name && model.description && model.type && model.sex && model.imageData) {

            var newComicsCharacter = new ComicsCharacter();
            newComicsCharacter.name =model.name;
            newComicsCharacter.description =model.description;
            newComicsCharacter.type =model.type;
            newComicsCharacter.sex =model.sex;
            cloudinary.uploader.upload(model.imageData, function(image){
                newComicsCharacter.imgUrl =image.url;
                newComicsCharacter.save();
                res.redirect('/admin/comicsCharacters');

            })
        }else{
            //return invalid model
            res.render('admin/createComicsCharacter', {
                errorMessage:'Invalid model',
                name:model.name,
                description:model.description
            })
        }
    }

    //create artists for comics character
    function createComicsCharacterArtist(req, res){
        var id =req.params.comicsCharacter;
        ComicsCharacter.findOne({_id:id}, function(err, character){
            if (err) {
                console.log(err);
            }else{
                if (character) {
                    res.render('admin/createArtist', {
                        comicsCharacterId:character._id,
                        comicsCharacterName:character.name
                    });
                }else{
                    res.render('admin/notFound', {
                        message:'Sorry Comics Character not Found'
                    });
                }
            }
        })

    }

    //save artist for comics character
    function saveComicsCharacterArtist(req, res){
        var model = req.body;
        if (model.firstName && model.lastName && model.imageData) {
            //create artist for comics character
            ComicsCharacter.findOne({_id:model.comicsCharacterId}, function(err, character){
                if (err) {
                    console.log(err);
                }else{

                    cloudinary.uploader.upload(model.imageData, function(image){
                        character.actors.push({
                            firstName:model.firstName,
                            lastName:model.lastName,
                            imgUrl:image.url
                        });
                        character.save();
                        res.redirect('/admin/comicsCharacters')
                    });

                }
            })
        }else{
            res.render('admin/createArtist', {
                errorMessage:'Invalid Model',
                comicsCharacterId:model.comicsCharacterId,
                comicsCharacterName:model.comicsCharacterName
            });
        }
    }

    //create movie for comics character artist
    function createArtistMovie(req, res){
        var characterId= req.params.comicsCharacter;
        var artistId =req.params.artist;
        res.render('admin/createMovie', {
            characterId:characterId,
            artistId:artistId
        });
    }

    //save movie for artist
    function saveArtistMovie(req, res){
        var model = req.body;
        imdb.getReq({name: model.name.trim()}, function (err, movie) {
            if (err) {
                res.render('admin/createMovie', {
                    characterId: model.character,
                    artistId: model.artist,
                    errorMessage: err.message
                });
            } else {
                ComicsCharacter.findOne({_id: model.character}, function (err, character) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        character.actors.filter(function (obj) {
                            if (obj._id == model.artist) {
                                obj.movies.push({
                                    name: movie.title,
                                    year: movie._year_data,
                                    IMDbRating: parseFloat(movie.rating),
                                    posterUrl: movie.poster
                                })

                            }
                        });
                        character.save();
                        res.redirect('/admin/comicsCharacters');
                    }
                });
            }
        });
    }


    // END Comics Characters Actions
    //-----------------------------------------------------------------------------------------------------------------

    return {
        index: index,
        //-------------------------------------------------------
        movieCharacters: movieCharacters,
        createMovieCharacter: createMovieCharacter,
        saveMovieCharacter: saveMovieCharacter,
        editMovieCharacter: editMovieCharacter,
        updateMovieCharacterInfo:updateMovieCharacterInfo,
        updateMovieCharacterImage:updateMovieCharacterImage,
        //--------------------------------------------------------
        comicsCharacters: comicsCharacters,
        createComicsCharacter:createComicsCharacter,
        saveComicsCharacter:saveComicsCharacter,
        createComicsCharacterArtist:createComicsCharacterArtist,
        saveComicsCharacterArtist:saveComicsCharacterArtist,
        createArtistMovie:createArtistMovie,
        saveArtistMovie:saveArtistMovie
    }
};

module.exports = adminController();

