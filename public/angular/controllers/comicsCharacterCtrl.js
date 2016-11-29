/**
 * Created by Toshiba on 11/20/2016.
 */


(function () {
    'use strict';

    angular.module('iMovieUi').controller('ComicsCharacterCtrl', function ($scope, $window, ComicsCharactersSvc, VoteSvc) {
        $scope.say = 'Hello world';

        var url = $window.location.pathname.split('/comics-character/')[1];

        ComicsCharactersSvc.getSingle(url)
            .then(function (response) {
                $scope.character = response.data;
            }, function (err) {
                console.log(err);
            });

        $scope.rate = function (artistId) {
            var dto = {
                artistId: artistId,
                characterId: $scope.character._id
            };
            VoteSvc.vote(dto)
                .then(function (response) {
                    console.log(response);
                }, function (err) {
                    console.log(err);
                });

        }
    });
})();