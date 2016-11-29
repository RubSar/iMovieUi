/**
 * Created by User on 11/29/2016.
 */
(function () {
    "use strict";

    angular.module('iMovieUi').factory('VoteSvc', function (helperSvc) {

        function vote(model) {
            return helperSvc.requestHandler({method: 'POST', url: '/api/vote/set', data:model});
        }
        function getRates(characterId){
            return helperSvc.requestHandler({method: 'GET', url: '/api/rate/rates', params:{characterId:characterId}});
        }
        function userRatesForMovies(movies){
            return helperSvc.requestHandler({method: 'Post', url: '/api/rate/userRatesByMovies', data:{movies:movies}});
        }

        return {
            vote: vote
            //getRates:getRates,
            //userRatesForMovies:userRatesForMovies
        };
    })
})();