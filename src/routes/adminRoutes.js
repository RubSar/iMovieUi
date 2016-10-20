var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var adminRouter = express.Router();
var adminController = require('../controllers/adminController.js');
var Character = require('../models/characterModel');

var router = function () {

    //get all characters
    adminRouter.route('/').get(function (req, res) {
        return adminController.characters(req, res);
        //var db = mongoose.createConnection('mongodb://localhost/comics');
        //var query = Character.find();
        //query.sort({createdOn: 'desc'})
        //    .limit(12)
        //    .exec(function (err, results) {
        //        if (err) {
        //            console.log(err);
        //        } else {
        //            res.render('characters', {
        //                title: 'Welcome back',
        //                characters: results
        //            });
        //        }
        //    });
        //db.close();
    });

    //create new character
    adminRouter.route('/create').post(function (req, res) {
        //return adminController.crateCharacter(req, res);
        mongoose.createConnection('mongodb://localhost/comics');
        var entry = new Character({
            name: req.body.name,
            description: req.body.description,
            imgUrl: req.body.imgUrl,
            type: req.body.type,
            sex: req.body.sex
        });
        entry.save();

        mongoose.disconnect();
        res.redirect('/admin/character/' + req.body.name);
    });

    //get  character
    adminRouter.route('/character/:name').get(function (req, res) {
        //return adminController.character(req, res);

        //mongoose.createConnection('mongodb://localhost/comics');
        //var query = Character.find({name:req.params});
        //Character.findOne({name: req.params.name}).exec(function (err, results) {
        //    res.render('character', {
        //        title: 'Continue creating new Comics',
        //        character: results
        //    });
        //});
        //mongoose.disconnect();
        res.render('character', {
            title: 'Continue creating new Comics',
            characterName:req.params.name
        });
    });

    adminRouter.route('/createActor').post(function(req, res){
        res.redirect('/admin/character/' + req.body.character+'/'+req.body.firstName);
    });

    adminRouter.route('/character/:name/:actor').get(function (req, res) {
        //return adminController.character(req, res);

        //mongoose.createConnection('mongodb://localhost/comics');
        //var query = Character.find({name:req.params});
        //Character.findOne({name: req.params.name}).exec(function (err, results) {
        //    res.render('character', {
        //        title: 'Continue creating new Comics',
        //        character: results
        //    });
        //});
        //mongoose.disconnect();
        console.log(req.params);
        res.render('actor', {
            title: 'Continue creating new Comics',
            character:req.params.name,
            actor:req.params.actor
        });
    });


    return adminRouter;
};

module.exports = router;