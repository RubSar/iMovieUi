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


var MovieCharacterSchema = new Schema({
    name:String,
    imgUrl:String,
    playedBy :String,
    movies:[MovieSchema],
    rateCount : 0,
    rateValue : 0,
    rateAverage: 0
});

module.exports =mongoose.model('MovieCharacter', MovieCharacterSchema);

