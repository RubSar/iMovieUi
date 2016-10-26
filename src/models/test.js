///**
// * Created by User on 10/14/2016.
// */
//
var mongoose = require('mongoose');
var fs = require('fs');
var Schema = mongoose.Schema;

var imgSchema = new Schema({
    img: {data: Buffer, contentType: String}
});

var A = mongoose.model('IMG', imgSchema);


var a = new A;
a.img.data = fs.readFileSync(imgPath);
a.img.contentType = 'image/png';
a.save(function (err, a) {
    if (err) throw err;

    console.error(a);
});




