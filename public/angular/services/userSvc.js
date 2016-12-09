//userSvc.js

(function () {
    'use strict';

    angular.module('iMovieUi').factory('UserSvc', function (helperSvc) {

        function userRates(model) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/user/rates', params: model});
        }

        function ratings() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/user/topRatings'});
        }

        return {
            userRates: userRates,
            ratings:ratings
        }
    });
})();