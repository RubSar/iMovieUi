/**
 * Created by Ruben on 10/17/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//characterStars
var starSchema = new Schema({
    rating: Number,
    userId: String
}, {_id: false});

//movies
var movieSchema = new Schema({
    name: String,
    year: Number,
    IMDbRating:Number,
    posterUrl: String
}, {_id: false});


//actors
var actorSchema = new Schema({
    firstName: String,
    lastName: String,
    fullNameUri: String,
    imgUrl: String,
    age: Number,
    movies: [movieSchema]
});


//comicsCharacter
var characterSchema = new Schema({
    name: String,
    description: String,
    imgUrl: String,
    createdOn: {type: Date, default: Date.now},
    type: String,
    sex: String,
    rating: [starSchema],
    actors: [actorSchema]
});

module.exports = mongoose.model('ComicsCharacter', characterSchema);