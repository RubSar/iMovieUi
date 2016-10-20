/**
 * Created by User on 10/18/2016.
 */
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Character = require('../models/characterModel');

//middleware
var middleware = function (req, res, next) {
    //if (!req.user) {
    //res.redirect('/');
    //}
    next();
};


module.exports.characters = function (req, res) {
    res.render('characters', {
        title: 'Welcome back'
    });

};

module.exports.crateCharacter = function (req, res) {
    var db = mongoose.createConnection('mongodb://localhost/comics');
    Character.find({name: req.params.name}, function (err, results) {
        console.log(results);
        if (!results.length) {
            var entry = new Character({
                name: req.body.name,
                description: req.body.description,
                imgUrl: req.body.imgUrl,
                type: req.body.type,
                sex: req.body.sex
            });
            entry.save();
        }
    });
    db.close();
    res.redirect('/admin/character/' + req.body.name);
};


module.exports.character = function (req, res) {
    var query = Character.find();
    query.where({name: req.params.name});

    query.exec(function (err, results) {
        if (err) {
            console.log(err);
        } else {
            res.render('character', {
                title: 'Continue creating new Comics',
                character: results
            });
        }
    });
};








