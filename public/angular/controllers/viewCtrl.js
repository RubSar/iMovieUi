/**
 * Created by Toshiba on 11/17/2016.
 */

(function () {
    'use strict';

    angular.module('iMovieUi').controller('ViewCtrl', function ($scope, $window, MovieCharacterSvs) {

        $scope.url =$window.location.pathname.split('/movie-character/')[1];
        console.log($scope.url);
        MovieCharacterSvs.getMovieCharacter($scope.url)
            .then(function(response){
               $scope.character = response.character;
            }, function(err){
                console.log(err);
            });

    });
})();