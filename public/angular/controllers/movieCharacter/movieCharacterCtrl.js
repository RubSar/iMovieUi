/**
 * Created by Ruben on 11/17/2016.
 */

//movieCharacterCtrl.js
(function () {
    'use strict';

    angular.module('iMovieUi').controller('MovieCharacterCtrl', ['$scope', '$window', '$document', '$state', 'MovieCharacterSvs', 'RateSvc', '$auth', 'helperSvc',
        function ($scope, $window, $document, $state, MovieCharacterSvs, RateSvc, $auth, helperSvc) {


            $scope.contentLoaded = false;
            $scope.notFound = false;

            var name = $state.params.longName;
            $scope.rateValue = 1;
            $scope.dataHref = $document.context.URL;

            $scope.avgUpdate = false;
            $scope.isDesktop = helperSvc.isDesktop();


            $scope.isAuthenticated = function () {
                return $auth.isAuthenticated();
            };


            MovieCharacterSvs.getMovieCharacter(name)
                .then(function (response) {
                    if (response.success) {
                        $scope.contentLoaded = true;
                        $scope.character = response.character;
                        $scope.userRate = response.userRate;
                        $scope.rateAverage = $scope.character.ratesValue > 0
                            ? helperSvc.decimalRound($scope.character.ratesValue / $scope.character.ratesCount, 1)
                            : 0;

                        $scope.fullName = $scope.character.name + ' played by ' + $scope.character.playedBy + ' in ' + $scope.character.movies[0].name;
                        $scope.keyWords = $scope.character.name + ', ' + $scope.character.playedBy;

                        if ($scope.isDesktop) {
                            var dto = {
                                movie: response.character.movies[0].name,
                                artist: response.character.playedBy,
                                year: response.character.movies[0].year
                            };
                            MovieCharacterSvs.getRecommended(dto)
                                .then(function (result) {
                                    $scope.recommended = result.data;
                                }, function (err) {
                                    console.log(err);
                                });
                        }
                    } else {
                        $scope.notFound = true;
                        $scope.message = response.message;
                    }

                }, function (err) {
                    console.log(err);
                });

            $scope.rateFunction = function (value) {
                var dto = {
                    value: value,
                    characterId: $scope.character._id
                };
                $scope.avgUpdate = true;
                RateSvc.rate(dto)
                    .then(function (response) {
                        if (response.success) {
                            if (response.message == 'created') {
                                $scope.character.ratesCount += 1;
                                $scope.character.ratesValue += response.value;
                                $scope.userRate = response.value;
                            }
                            else {
                                $scope.character.ratesValue += response.dif;
                                $scope.userRate += response.dif;
                            }

                            $scope.avgUpdate = false;
                            $scope.rateAverage = $scope.character.ratesValue > 0 ? $scope.character.ratesValue / $scope.character.ratesCount : 0;
                        }
                    }, function (err) {
                        console.log(err);
                    })
            };

            $scope.shareOnFacebook = function () {

                var caption = ($auth.isAuthenticated() && !!$scope.userRate) ? 'My rating ' + $scope.userRate + ', ' : '';
                var description = $scope.character.name + ' is a character from ' + $scope.character.movies[0].name + ' (' + $scope.character.movies[0].year + '). '
                    + 'He is portrayed by ' + $scope.character.playedBy + '. '
                    + caption + ' Rate Average : ' + $scope.rateAverage + ', Rates count : ' + $scope.character.ratesCount;
                FB.ui(
                    {
                        method: 'feed',
                        name: 'Rate for ' + $scope.character.name.toUpperCase(),
                        link: $scope.dataHref,
                        picture: $scope.character.imgUrl,
                        description: description
                    });
            };

            $scope.$watch('userRate', function (newVal, oldVal) {
                if (newVal && newVal != oldVal) {
                    $scope.rateValue = newVal;
                }
            });
        }]);
})();