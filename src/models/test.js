///**
// * Created by User on 10/14/2016.
// */
//
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
    name: String,
    createdOn: {type: Date, default: Date.now}
});

module.exports =mongoose.model('Test', testSchema);





