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


var UserSchema = new Schema({
    facebookId:String,
    email:String,
    displayName:String,
    fullName:String,
    rates:[{type:Schema.ObjectId, ref:'Rate'}]
});

var RateSchema = new Schema({
   // userId:{type:Schema.ObjectId, ref:'User'},
    userId:String,
    characterId:{type:Schema.ObjectId, ref:'MovieCharacter'},
    value:{type:Number, min:1, max:10},
    created:{type:Date, default:Date.now}
});


var MovieCharacterSchema = new Schema({
    name:String,
    imgUrl:String,
    playedBy :String,
    movies:[MovieSchema],
    rates: [{ type: Schema.ObjectId, ref: 'Rate'}]
});

var User =mongoose.model('User', UserSchema);
var Rate =mongoose.model('Rate', RateSchema);
var MovieCharacter =mongoose.model('MovieCharacter', MovieCharacterSchema);

module.exports={
    User:User,
    Rate:Rate,
    MovieCharacter:MovieCharacter
};