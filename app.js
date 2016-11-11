var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//var facebookAuth = require('./src/config/facebookAuth.js');



//connect to database
require('./src/config/database.js')();
//init image blob
require('./src/config/cloudinary.js')();

var app = express();

var port = process.env.PORT || 5000;

//controllers
var adminRouter = require('./src/routes/adminRoutes');
var authRouter = require('./src/routes/authRoutes');
var homeRouter = require('./src/routes/homeRoutes');
//var seedRouter = require('./src/routes/seedDB');


//APIs
var movieCharacterAPI = require('./src/api/movieCharacters.js');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
//app.use(session({secret: 'comicsCharacters'}));
// log to console
//app.use(morgan('dev'));

// Use the passport package in our application
//app.use(passport.initialize());

//app.use(function (req, res, next) {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
//    res.header('Access-Control-AllowHeaders', 'Content-Type, Authorization');
//    next();
//});


//require('./src/config/passport')(app);

app.set('views', './src/views/');

app.set('view engine', 'ejs');

//register controllers
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);
app.use('/', homeRouter);

//register APIs
app.use('/api/movieCharacters', movieCharacterAPI);


app.listen(port, function (err) {
    console.log('running server on port ' + port);
});