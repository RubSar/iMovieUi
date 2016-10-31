/**
 * Created by Toshiba on 10/31/2016.
 */
var express = require('express');

var api = express.Router();

api.use('/top', function(req, res){
   res.send({
       data:{message:'all right', status:200}
   });
});

module.exports =api;