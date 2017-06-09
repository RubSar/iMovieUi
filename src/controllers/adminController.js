/**
 * Created by User on 10/18/2016.
 */
var ComicCharacter = require('../models/comicCharacterModel').ComicCharacter;
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

    //save comic character
    function saveMovieCharacter(req, res) {
        var model = req.body;
        console.log(model);
        //if model is valid continue to next action
        if (!!model.name && !!model.playedBy && model.imageData && model.movie) {

            MovieCharacter.findOne({name: model.name, playedBy: model.playedBy}, function (err, character) {
                if (err) {
                    console.log(err);
                } else {
                    //if found character,
                    if (character) {
                        res.redirect('/admin/edit/character/' + character._id)
                    } else {
                        var newCharacter = new MovieCharacter();
                        newCharacter.name = model.name.trim();
                        newCharacter.playedBy = model.playedBy.trim();
                        newCharacter.about = model.about ? model.about.trim() : '';
                        newCharacter.type = model.type;
                        newCharacter.sex = model.sex;
                        cloudinary.uploader.upload(req.body.imageData, function (result) {
                            newCharacter.imgUrl = result.url;
                            imdb.getReq({name: req.body.movie}, function (err, movie) {
                                if (err) {
                                    res.render('admin/createMovieCharacter', {
                                        name: newCharacter.name,
                                        playedBy: newCharacter.playedBy,
                                        about: newCharacter.about,
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
                                    res.redirect('/admin/characters')
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
                name: model.name,
                playedBy: model.playedBy,
                about: model.about,
                movie: model.movie,
                errorMessage: 'Model invalid'
            })
        }

    }

    //edit movie character
    function editMovieCharacter(req, res) {
        var id = req.params.id;
        MovieCharacter.findOne({_id: id}, '_id name playedBy imgUrl movies.name about', function (err, result) {
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
                    character.name = model.name || character.name;
                    character.playedBy = model.playedBy || character.playedBy;
                    character.type = model.type || character.type;
                    character.sex = model.sex || character.sex;
                    character.about = model.about || character.about;
                    if (character.movies[0].name.trim() !== model.movie.trim()) {
                        imdb.getReq({name: model.movie}, function (err, movie) {
                            if (err) {
                                console.log(err);
                                res.send({
                                    errorMessage: err
                                })
                            } else {
                                character.movies = [];
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
                    } else {
                        character.save();
                        res.redirect('/admin/movieCharacters')
                    }


                }

            }
        });
    }

    //update movie character image
    function updateMovieCharacterImage(req, res) {
        var body = req.body;
        MovieCharacter.findOne({_id: body.id}, function (err, character) {
            if (err) {
                console.log(err);
            } else {
                if (character) {
                    cloudinary.uploader.upload(body.imageData, function (image) {
                        cloudinary.uploader.destroy(character.imgUrl, function (result) {
                            console.log(result);
                            character.imgUrl = image.url;
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
    //START Comic Characters Actions


    //list comic characters
    function comicCharacters(req, res) {
        ComicCharacter.find({}, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                res.render('admin/comicCharacters', {
                    characters: results,
                    title: 'Comic Characters for managing'
                });
            }
        });
    }

    //create comic Character
    function createComicCharacter(req, res) {
        res.render('admin/createComicCharacter')
    }

    //save comics character
    function saveComicCharacter(req, res) {
        var model = req.body;
        if (model.name && model.description && model.type && model.sex && model.imageData) {

            var newComicCharacter = new ComicCharacter();
            newComicCharacter.name = model.name;
            newComicCharacter.description = model.description;
            newComicCharacter.type = model.type;
            newComicCharacter.sex = model.sex;
            newComicCharacter.about = model.about;
            cloudinary.uploader.upload(model.imageData, function (image) {
                newComicCharacter.imgUrl = image.url;
                newComicCharacter.save();
                res.redirect('/admin/comicCharacters');

            })
        } else {
            //return invalid model
            res.render('admin/createComicCharacter', {
                errorMessage: 'Invalid model',
                name: model.name,
                description: model.description
            })
        }
    }

    //edit comic character
    function editComicCharacter(req, res) {
        var model = req.params;
        ComicCharacter.findOne({_id: model.id}, function (err, character) {
            if (err) {
                console.log(err);
            } else {
                res.render('admin/editComicCharacter', {
                    character: character
                });
            }
        });
    }


    //update comic character
    function updateComicCharacterInfo(req, res) {
        var model = req.body;
        ComicCharacter.findOne({_id: model.id}, function (err, character) {
            if (err) {
                console.log(err);
            } else {
                character.name = model.name || character.name;
                character.description = model.description || character.description;
                character.type = model.type || character.type;
                character.sex = model.sex || character.sex;
                character.about = model.about || character.about;
                character.save();
                res.redirect('admin/comicCharacter');
            }
        });
    }

    //create artists for comic character
    function createComicCharacterArtist(req, res) {
        var id = req.params.comicCharacter;
        ComicCharacter.findOne({_id: id}, function (err, character) {
            if (err) {
                console.log(err);
            } else {
                if (character) {
                    res.render('admin/createArtist', {
                        comicCharacterId: character._id,
                        comicCharacterName: character.name
                    });
                } else {
                    res.render('admin/notFound', {
                        message: 'Sorry Comic Character not Found'
                    });
                }
            }
        })

    }

    //save artist for comic character
    function saveComicCharacterArtist(req, res) {
        var model = req.body;
        if (model.firstName && model.lastName && model.imageData) {
            //create artist for comic character
            ComicCharacter.findOne({_id: model.comicCharacterId}, function (err, character) {
                if (err) {
                    console.log(err);
                } else {

                    cloudinary.uploader.upload(model.imageData, function (image) {
                        character.actors.push({
                            firstName: model.firstName,
                            lastName: model.lastName,
                            about: model.about,
                            imgUrl: image.url
                        });
                        character.save();
                        res.redirect('/admin/comicCharacters')
                    });

                }
            })
        } else {
            res.render('admin/createArtist', {
                errorMessage: 'Invalid Model',
                comicCharacterId: model.comicCharacterId,
                comicCharacterName: model.comicCharacterName
            });
        }
    }

    //edit artists for comic character
    function editComicCharacterArtist(req, res) {
        var params = req.params;
        ComicCharacter.findOne({_id: params.comicCharacterId}, function (err, character) {
            if (err) {
                console.log(err);
            } else {
                if (character) {
                    var artist = character.actors.filter(function (artist) {
                        console.log(artist._id + ' ------------------- ' + params.artistId);
                        return artist._id == params.artistId;
                    })[0];
                    console.log(artist);

                    res.render('admin/editArtist', {
                        comicCharacterId: character._id,
                        comicCharacterName: character.name,
                        artist: artist
                    });
                } else {
                    res.render('admin/notFound', {
                        message: 'Sorry something went wrong'
                    });
                }
            }
        });

    }

    //update comic character artist info
    function updateComicCharacterArtistInfo(req, res) {
        var model = req.body;
        ComicCharacter.findOne({_id: model.comicCharacterId}, function (err, character) {
            if (err) {
                console.log(err);
            } else {
                if (character) {
                    character.actors.forEach(function (artist) {
                        if (artist._id == model.artistId) {
                            artist.firstName = model.firstName || artist.firstName;
                            artist.lastName = model.lastName || artist.lastName;
                            artist.about = model.about || artist.about;
                            character.save(function(err, result){
                                if (err) {
                                    console.log(err);
                                }else{
                                    res.redirect('/admin/comicCharacters');
                                }
                            });

                        }
                    });


                } else {
                    res.render('admin/notFound', {
                        message: 'Sorry something went wrong'
                    });
                }
            }
        });
    }

    //create movie for comics character artist
    function createArtistMovie(req, res) {
        var characterId = req.params.comicCharacter;
        var artistId = req.params.artist;
        res.render('admin/createMovie', {
            characterId: characterId,
            artistId: artistId
        });
    }

    //save movie for artist
    function saveArtistMovie(req, res) {
        var model = req.body;
        imdb.getReq({name: model.name.trim()}, function (err, movie) {
            if (err) {
                res.render('admin/createMovie', {
                    characterId: model.character,
                    artistId: model.artist,
                    errorMessage: err.message
                });
            } else {
                ComicCharacter.findOne({_id: model.character}, function (err, character) {
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
                        res.redirect('/admin/comicCharacters');
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
        updateMovieCharacterInfo: updateMovieCharacterInfo,
        updateMovieCharacterImage: updateMovieCharacterImage,
        //--------------------------------------------------------
        comicCharacters: comicCharacters,
        createComicCharacter: createComicCharacter,
        saveComicCharacter: saveComicCharacter,
        editComicCharacter: editComicCharacter,
        updateComicCharacterInfo: updateComicCharacterInfo,
        createComicCharacterArtist: createComicCharacterArtist,
        saveComicCharacterArtist: saveComicCharacterArtist,
        editComicCharacterArtist: editComicCharacterArtist,
        updateComicCharacterArtistInfo: updateComicCharacterArtistInfo,
        createArtistMovie: createArtistMovie,
        saveArtistMovie: saveArtistMovie
    }
};

module.exports = adminController();

