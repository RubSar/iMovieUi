var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/comics', function(err) {
    if (err) {
        console.err(err);
    } else {
        console.log('Connected');
    }
});

var app = express();

var port = process.env.PORT || 5000;

var adminRouter = require('./src/routes/adminRoutes');
var authRouter = require('./src/routes/authRoutes')();

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



app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render'

    });
});
app.get('/test', function (req, res) {
    res.render('admin/test', {
        title: 'Hello from render'
    });
});



app.listen(port, function (err) {
    console.log('running server on port ' + port);
});