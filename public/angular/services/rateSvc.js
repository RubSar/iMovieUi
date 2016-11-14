/**
 * Created by User on 11/14/2016.
 */

(function () {
    "use strict";

    angular.module('iMovieUi').factory('RateSvc', function (helperSvc) {

        function rate(model) {
            return helperSvc.requestHandler({method: 'POST', url: '/api/rate/set', data:model});
        }

        return {
            rate: rate
        };
    })
})();