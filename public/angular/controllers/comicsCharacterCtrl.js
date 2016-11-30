/**
 * Created by Toshiba on 11/20/2016.
 */


(function () {
    'use strict';

    angular.module('iMovieUi').controller('ComicsCharacterCtrl', function ($scope, $window, ComicsCharactersSvc, VoteSvc) {

        var url = $window.location.pathname.split('/comics-character/')[1];
        $scope.voteStart =false;

        ComicsCharactersSvc.getSingle(url)
            .then(function (response) {
                $scope.character = response.data;
            }, function (err) {
                console.log(err);
            });

        $scope.rate = function (artistId, index) {
            $scope.voteStart =true;
            $scope.current =index;
            var dto = {
                artistId: artistId,
                characterId: $scope.character._id
            };
            VoteSvc.vote(dto)
                .then(function (response) {
                    $scope.voteStart =false;
                    console.log(response);
                }, function (err) {
                    console.log(err);
                });

        }
    });
})();