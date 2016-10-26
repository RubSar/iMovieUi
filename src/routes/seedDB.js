/**
 * Created by User on 10/26/2016.
 */
var express = require('express');
var mongoose = require('mongoose');
var seedRouter = express.Router();

//var fs = require('fs');
//var Schema = mongoose.Schema;
//
//var imgSchema = new Schema({
//    img: {data: Buffer, contentType: String}
//});
//
//var IMG = mongoose.model('IMG', imgSchema);
//
//var imgUrl =process.cwd() +'/public/img/batman.jpg';
//
//
//var a = new IMG;
//
//a.img.data = fs.readFileSync(imgUrl);
//a.img.contentType = 'image/jpg';
//a.save(function (err, a) {
//    if (err) throw err;
//    console.error(a);
//});
//
//
//
//
//
//
//seedRouter.route('/img').get(function (req, res) {
//    IMG.find({}, function (err, doc) {
//        if (err) return next(err);
//        res.contentType(doc[0].img.contentType);
//        res.send(doc[0].img.data);
//    });
//});
//seedRouter.route('/fuck').get(function (req, res) {
//    IMG.find({}, function (err, doc) {
//        if (err) return next(err);
//        //res.contentType(doc[0].img.contentType);
//        res.render('fuck', {
//           img: doc[0].img.data
//        });
//    });
//});


module.exports = seedRouter;