/**
 * Created by User on 10/17/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//characterStars
var starSchema = new Schema({
    rating: Number,
    userId: String
}, {_id: false});

//awards
var awardsSchema = new Schema({
    name: String,
    year: Number,
    nomination:String,
    winners:[String]
}, {_id: false});

//movies
var movieSchema = new Schema({
    name: String,
    year: Number,
    IMDbRating:Number,
    posterUrl: String,
    awards: [awardsSchema]
}, {_id: false});


//actors
var actorSchema = new Schema({
    firstName: String,
    lastName: String,
    fullNameUri: String,
    imgUrl: String,
    age: Number,
    movies: [movieSchema]
}, {_id: false});


//comicsCharacter
var characterSchema = new Schema({
    name: String,
    description: String,
    imgUrl: String,
    createdOn: {type: Date, default: Date.now},
    type: ['SuperHero', 'Villain', 'Complicated'],
    sex: ['Male', 'Female', 'Complicated'],
    rating: [starSchema],
    actors: [actorSchema]
});

module.exports = mongoose.model('Character', characterSchema);