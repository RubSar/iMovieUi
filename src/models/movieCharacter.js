/**
 * Created by Toshiba on 10/29/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    name:String,
    year:Number,
    IMDbRating:Number,
    IMDbId:String,
    poster:String
});

var VoteSchema =new Schema({
    star:{type:Number, min:1, max:10},
    userId:String
});

var MovieCharacterSchema = new Schema({
    name:String,
    imgUrl:String,
    playedBy :String,
    movies:[MovieSchema],
    votes:[VoteSchema]

});

module.exports =mongoose.model('MovieCharacter', MovieCharacterSchema);

