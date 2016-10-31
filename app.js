var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dk1chsp5h',
    api_key: '672872814841976',
    api_secret: 'TEj_snS8SOOmDRpWv3VikI2sOjs'
});
//var jwt =require('jsonwebtoken');


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

//controllers
var adminRouter = require('./src/routes/adminRoutes');
var authRouter = require('./src/routes/authRoutes')();
var homeRouter = require('./src/routes/homeRoutes');
var seedRouter = require('./src/routes/seedDB');

//APIs
var movieCharacterAPI =require('./src/api/movieCharacters.js');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'comicsCharacters'}));

require('./src/config/passport')(app);

app.set('views', './src/views/');

app.set('view engine', 'ejs');

//register controllers
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);
app.use('/seed', seedRouter);
app.use('/', homeRouter);

//register APIs
app.use('/api/test', movieCharacterAPI);



app.listen(port, function (err) {
    console.log('running server on port ' + port);
});