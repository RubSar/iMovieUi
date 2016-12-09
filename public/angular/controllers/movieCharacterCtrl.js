/**
 * Created by Toshiba on 11/17/2016.
 */

//movieCharacterCtrl.js
(function () {
    'use strict';

    angular.module('iMovieUi').controller('MovieCharacterCtrl', ['$scope', '$window', 'MovieCharacterSvs', 'RateSvc', '$auth', function ($scope, $window, MovieCharacterSvs, RateSvc, $auth) {

        var url = $window.location.pathname.split('/movie-character/')[1];
        $scope.rateValue = 1;
        $scope.dataHref = document.URL;
        $scope.contentLoaded = false;
        $scope.avgUpdate = false;


        $scope.isAuthenticated = function () {
            return $auth.isAuthenticated();
        };

        MovieCharacterSvs.getMovieCharacter(url)
            .then(function (response) {
                $scope.character = response.character;
                $scope.userRate = response.userRate;
                $scope.rateAverage = !!$scope.character.rates.length ? average(sum($scope.character.rates, 'value'), $scope.character.rates.length) : 0;
                $scope.contentLoaded = true;

            }, function (err) {
                console.log(err);
            });

        $scope.rateFunction = function (value) {
            var dto = {
                value: value,
                characterId: $scope.character._id
            };
            RateSvc.rate(dto)
                .then(function (response) {
                    if (response.success) {
                        $scope.avgUpdate = true;
                        RateSvc.getRates($scope.character._id)
                            .then(function (response) {
                                $scope.character.rates = response.data;
                                $scope.avgUpdate = false;
                                $scope.userRate = value;
                            }, function (err) {
                                console.log(err);
                            })
                    }
                }, function (err) {
                    console.log(err);
                })
        };

        $scope.$watch('userRate', function (newVal, oldVal) {
            if (newVal && newVal != oldVal) {
                $scope.rateValue = newVal;
            }
        });
        $scope.$watch('character.rates', function (newVal, oldVal) {
            if (newVal && newVal != oldVal) {
                $scope.rateAverage = !!$scope.character.rates.length ? average(sum($scope.character.rates, 'value'), $scope.character.rates.length) : 0;
            }
        });

        $scope.$watch('character', function (newVal, oldVal) {
            if (!!newVal && newVal !== oldVal) {
                // if (newVal.rates == oldVal.rates) {
                var dto = {
                    movie: newVal.movies[0].name,
                    artist: newVal.playedBy,
                    year: newVal.movies[0].year
                };
                MovieCharacterSvs.getRecommended(dto)
                    .then(function (result) {
                        $scope.recommended = result.data;
                    }, function (err) {
                        console.log(err);
                    });
                // }
            }

        }, true);

        function sum(items, prop) {
            return items.reduce(function (a, b) {
                return a + b[prop];
            }, 0);
        }

        function average(sum, length) {
            return (sum / length).toFixed(1);
        }


    }]);
})();