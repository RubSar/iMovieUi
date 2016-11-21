/**
 * Created by Toshiba on 11/20/2016.
 */


(function () {
    'use strict';

    angular.module('iMovieUi').controller('ComicsCharacterCtrl', function ($scope, $window, ComicsCharactersSvc) {
        $scope.say = 'Hello world';

        var url = $window.location.pathname.split('/comics-character/')[1];

        ComicsCharactersSvc.getSingle(url)
            .then(function (response) {
                $scope.character = response.data;
            }, function (err) {
                console.log(err);
            });

        $scope.rate = function (actorId) {
            console.log(actorId);
        }
    });
})();