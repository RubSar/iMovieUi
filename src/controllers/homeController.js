
var Character = require('../models/characterModel');

var homeController = function () {

    function index (req, res) {
        Character.find({}, 'name imgUrl description type', function(err, results){
            if (err) {
                console.log(err);
            } else{
                console.log(results);
                res.render('index', {
                    characters:results
                });
            }
        });
    }

    function  view(req, res){
        console.log(req.params.name);
        Character.find({name:req.params.name}, function(err, results){
            if (err) {
                console.log(err);
            } else{
                console.log(results[0]);
                res.render('view', {
                    character:results[0]
                });
            }
        });
    }

    return {
        index: index,
        view:view
    };
};

module.exports = homeController();