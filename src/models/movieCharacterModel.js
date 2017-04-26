/**
 * Created by Toshiba on 10/29/2016.
 */

var mongoose = require('mongoose');
var Vote = require('../models/comicsCharacterModel.js').Vote;
var Schema = mongoose.Schema;


var MovieSchema = new Schema({
    name: String,
    year: Number,
    IMDbRating: Number,
    IMDbId: String,
    poster: String
});


var UserSchema = new Schema({
    facebookId: String,
    email: String,
    displayName: String,
    fullName: String,
    rates: [{type: Schema.ObjectId, ref: 'Rate'}],
    votes: [{type: Schema.ObjectId, ref: 'Vote'}]
});

var MovieCharacterSchema = new Schema({
    name: String,
    imgUrl: String,
    playedBy: String,
    type: {type: String, enum: ['movie', 'tv-series'], default: 'movie'},
    sex: {type: String, enum: ['male', 'female', 'none'], default: 'male'},
    movies: [MovieSchema],
    rates: [{type: Schema.ObjectId, ref: 'Rate'}],
    ratesValue: {type: Number, default: 0},
    ratesCount: {type: Number, default: 0}
});

MovieCharacterSchema.index({name: 'text', playedBy: 'text', 'movies.name': 'text', type:'text'});

var RateSchema = new Schema({
    userId: {type: Schema.ObjectId, ref: 'User'},
    characterId: {type: Schema.ObjectId, ref: 'MovieCharacter'},
    value: {type: Number, min: 1, max: 10},
    created: {type: Date, default: Date.now}
});


var User = mongoose.model('User', UserSchema);
var Rate = mongoose.model('Rate', RateSchema);
var MovieCharacter = mongoose.model('MovieCharacter', MovieCharacterSchema);

module.exports = {
    User: User,
    Rate: Rate,
    MovieCharacter: MovieCharacter
};