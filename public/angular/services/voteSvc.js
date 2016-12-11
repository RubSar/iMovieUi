/**
 * Created by User on 11/29/2016.
 */
(function () {
    "use strict";

    angular.module('iMovieUi').factory('VoteSvc', function (helperSvc) {

        function vote(model) {
            return helperSvc.requestHandler({method: 'POST', url: '/api/vote/set', data:model});
        }
        function getUserVote(characterId){
            return helperSvc.requestHandler({method: 'GET', url: '/api/vote/user', params:{characterId:characterId}});
        }

        return {
            vote: vote,
            getUserVote:getUserVote

        };
    })
})();