var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');


var mongoose = require('mongoose');

mongoose.connect('mongodb://comics-admin:born77villain77ml77c@ds031597.mlab.com:31597/comics', function(err) {
    if (err) {
        console.err(err);
    } else {
        console.log('Connected');
    }
});

var app = express();

var port = process.env.PORT || 5000;


//var fs = require('fs');
//var Schema = mongoose.Schema;
//
//var imgSchema = new Schema({
//    img: {data: Buffer, contentType: String}
//});
//
//var IMG = mongoose.model('IMG', imgSchema);
//
//var imgUrl =__dirname +'/public/img/joker.jpg';

//var a = new IMG;
//a.img.data = fs.readFileSync(imgUrl);
//a.img.contentType = imgUrl;
//a.save(function (err, a) {
//    if (err) throw err;
//
//    console.error(a);
//});




var adminRouter = require('./src/routes/adminRoutes');
var authRouter = require('./src/routes/authRoutes')();
var homeRouter = require('./src/routes/homeRoutes');
var seedRouter = require('./src/routes/seedDB');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'comicsCharacters'}));

require('./src/config/passport')(app);

app.set('views', './src/views/');

app.set('view engine', 'ejs');

app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);
app.use('/seed', seedRouter);
app.use('/', homeRouter);
//test for image
app.get('/img/hell', function(req, res){

});

app.listen(port, function (err) {

    console.log('running server on port ' + port);
});