/**
 * Created by Toshiba on 10/31/2016.
 */
var express = require('express');

var api = express.Router();


var router = function () {
    //GET actions

    api.route('/top').get(function(req, res){
        res.send({
            data:{message:'all right', status:200}
        });
    });

    return api;
};
module.exports = router();