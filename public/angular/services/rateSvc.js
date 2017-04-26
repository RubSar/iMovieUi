/**
 * Created by Ruben on 11/14/2016.
 */

(function () {
    "use strict";

    angular.module('iMovieUi').factory('RateSvc',['helperSvc', function (helperSvc) {

        function rate(model) {
            return helperSvc.requestHandler({method: 'POST', url: '/api/rate/set', data:model});
        }
        function getRates(characterId){
            return helperSvc.requestHandler({method: 'GET', url: '/api/rate/rates', params:{characterId:characterId}});
        }
        function userRatesForCharacters(movies){
            return helperSvc.requestHandler({method: 'Post', url: '/api/rate/userRatesByCharacters', data:{movies:movies}});
        }

        function userRate(characterId){
            return helperSvc.requestHandler({method: 'GET', url: '/api/rate/userRate', params:{characterId:characterId}});
        }

        return {
            rate: rate,
            getRates:getRates,
            userRate:userRate,
            userRatesForCharacters:userRatesForCharacters
        };
    }])
})();