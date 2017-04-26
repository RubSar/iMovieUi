/**
 * Created by Ruben on 10/17/2016.
 */

var mongoose = require('mongoose');
var User = require('../models/movieCharacterModel.js').User;
var Schema = mongoose.Schema;


//characterStars
var starSchema = new Schema({
    rating: Number,
    userId: String
}, {_id: false});

//movies
var MovieSchema = new Schema({
    name: String,
    year: Number,
    IMDbRating: Number,
    posterUrl: String
}, {_id: false});


//actors
var actorSchema = new Schema({
    firstName: String,
    lastName: String,
    votesCount: {type: Number, default: 0},
    imgUrl: String,
    movies: [MovieSchema]
});

var VoteSchema = new Schema({
    userId: {type: Schema.ObjectId, ref: 'User'},
    characterId: {type: Schema.ObjectId, ref: 'ComicsCharacter'},
    chosen: String,
    created: {type: Date, default: Date.now}
});


//comicsCharacter
var CharacterSchema = new Schema({
    name: String,
    description: String,
    imgUrl: String,
    createdOn: {type: Date, default: Date.now},
    type: String,
    sex: String,
    votes: [{type: Schema.ObjectId, ref: 'Vote'}],
    rating: [starSchema],
    actors: [actorSchema]
});

CharacterSchema.index({name: 'text'});

var ComicsCharacter = mongoose.model('ComicsCharacter', CharacterSchema);
var Vote = mongoose.model('Vote', VoteSchema);

module.exports = {
    ComicsCharacter: ComicsCharacter,
    Vote: Vote
};

