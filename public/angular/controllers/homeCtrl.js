/**
 * Created by Toshiba on 11/12/2016.
 */

(function () {
    'use strict';

    angular.module('iMovieUi').controller('HomeCtrl', function ($scope, MovieCharacterSvs, ComicsCharactersSvc, helperSvc, RateSvc, $auth) {
        //get movie characters
        MovieCharacterSvs.getTopCharacters()
            .then(function (response) {
                $scope.originalMovieCharacters = response.data;
            }, function (err) {
                console.log(err);
            });

        $scope.$watch('originalMovieCharacters', function (newVal, oldVal) {
            if (newVal) {
                $scope.movieCharacters = helperSvc.chunk(newVal, 2);
                $scope.movieCharacterIds = newVal.map(function (a) {
                    return {_id: a._id};
                });
            }
        }, true);

        $scope.isAuthenticated = function(){
            return $auth.isAuthenticated();
        };

        $scope.$watch('isAuthProp', function(newVal, oldVal){
            if (newVal) {

            }
            console.log('--------- yep --------');
        }, true);



        $scope.$watch('movieCharacterIds', function (newVal, oldVal) {
            if (newVal != oldVal) {
                RateSvc.userRatesForMovies($scope.movieCharacterIds)
                    .then(function (response) {
                        if (response.success) {
                            insertUserRating(response.data);
                        }
                    }, function (err) {
                        console.log(err);
                    });
            }
        }, true);

        //get comics characters
        ComicsCharactersSvc.getAll()
            .then(function (response) {
                $scope.comicsCharacters = response.data;
            }, function (err) {
                console.log(err);
            });

        //TODO: improve implementation letter
        function insertUserRating(userRates) {
            for (var i = 0; i < userRates.length; i++) {
                for (var j = 0; j < $scope.originalMovieCharacters.length; j++) {
                    if (userRates[i].characterId == $scope.originalMovieCharacters[j]._id) {
                        $scope.originalMovieCharacters[j].userRate = userRates[i].value;
                    }
                }
            }
            console.log($scope.originalMovieCharacters);
        }


    });
})();