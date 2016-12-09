/**
 * Created by Ruben on 11/12/2016.
 */

(function () {
    'use strict';

    angular.module('iMovieUi').controller('HomeCtrl', ['$scope', 'MovieCharacterSvs', 'helperSvc', 'RateSvc', '$auth', function ($scope, MovieCharacterSvs, helperSvc, RateSvc, $auth) {
        //get movie characters
        MovieCharacterSvs.getTopCharacters()
            .then(function (response) {
                $scope.originalMovieCharacters = response.data;
            }, function (err) {
                console.log(err);
            });


        $scope.$watch('originalMovieCharacters', function (newVal, oldVal) {
            if (!!newVal) {
                $scope.movieCharacters = helperSvc.chunk(newVal, 2);
                getUserRates();
            }
        }, true);


        $scope.isAuthenticated = function () {
            return $auth.isAuthenticated();
        };


        $scope.$watch('isAuthProp', function (newVal, oldVal) {
            if (newVal) {
                getUserRates();
            }

        }, true);


        //TODO: improve implementation letter
        function insertUserRating(userRates) {
            for (var i = 0; i < userRates.length; i++) {
                for (var j = 0; j < $scope.originalMovieCharacters.length; j++) {
                    if (userRates[i].characterId == $scope.originalMovieCharacters[j]._id) {
                        $scope.originalMovieCharacters[j].userRate = userRates[i].value;
                    }
                }
            }
        }

        function getUserRates() {
            if (!!$scope.originalMovieCharacters && $scope.isAuthProp) {
                var movieCharacterIds = $scope.originalMovieCharacters.map(function (a) {
                    return {_id: a._id};
                });
                RateSvc.userRatesForMovies(movieCharacterIds)
                    .then(function (response) {
                        if (response.success) {
                            insertUserRating(response.data);
                        }
                    }, function (err) {
                        console.log(err);
                    });
            }

        }


    }]);
})();