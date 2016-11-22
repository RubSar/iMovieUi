
//userSvc.js

(function () {
    'use strict';

    angular.module('iMovieUi').factory('UserSvc', function (helperSvc) {

       function userRates(){
           return helperSvc.requestHandler({method: 'GET', url: '/api/user/rates'});
       }

       return{
           userRates:userRates
       }
    });
})();