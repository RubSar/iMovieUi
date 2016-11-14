/**
 * Created by User on 11/14/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RateSchema = new Schema({
    userId:String,
    characterId:String,
    value:{type:Number, min:1, max:10},
    created:{type:Date, default:Date.now}
});

module.exports =mongoose.model('Rate', RateSchema);