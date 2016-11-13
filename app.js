var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

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
var comicsCharacterAPI = require('./src/api/comicsCharacters.js');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());



app.set('views', './src/views/');

app.set('view engine', 'ejs');

//register controllers
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);
app.use('/', homeRouter);

//register APIs
app.use('/api/movieCharacters', movieCharacterAPI);
app.use('/api/comicsCharacters', comicsCharacterAPI);


app.listen(port, function (err) {
    console.log('running server on port ' + port);
});