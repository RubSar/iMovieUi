/**
 * Created by User on 10/26/2016.
 */

var mongoose = require('mongoose');
var Character = require('../models/characterModel');


Character.find({}, function (err, results) {
    results.filter(function (character) {
        character.actors.filter(function (actor) {
            actor.fullNameUri = actor.firstName.toLowerCase() + '_' + actor.lastName.toLowerCase();
            actor.imgUrl = '/img/artists/' + actor.firstName.toLowerCase() + '-' + actor.lastName.toLowerCase() + '.jpg';
        });
    });
});