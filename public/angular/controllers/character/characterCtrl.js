/**
 * Created by Ruben on 11/17/2016.
 */

//characterCtrl.js
(function () {
    'use strict';

    angular.module('iMovieUi').controller('CharacterCtrl', ['$scope', '$rootScope', '$window', '$location', '$anchorScroll', '$state', 'MovieCharacterSvs', 'RateSvc', '$auth', 'helperSvc','MetaTagsService',
        function ($scope, $rootScope, $window, $location, $anchorScroll, $state, MovieCharacterSvs, RateSvc, $auth, helperSvc, MetaTagsService) {

            //init page title
            $rootScope.metaTags = $rootScope.metaTags || MetaTagsService;

            $scope.contentLoaded = false;
            $scope.notFound = false;
            $scope.avgUpdate = false;
            $scope.rateValue = 1;

            $scope.isDesktop = helperSvc.isDesktop();


            $scope.dataHref = function () {
                var url = $location.absUrl();
                return url.replace('localhost:3000', 'imovieui.com');
            };

            var metaModel={
                url:$scope.dataHref()
            };

            $scope.isAuthenticated = function () {
                return $auth.isAuthenticated();
            };

            $scope.$watch('authState', function (newVal, oldVal) {
                if (!!$scope.character && newVal && !$scope.userRate) {
                    RateSvc.userRate($scope.character._id)
                        .then(function (response) {
                            $scope.userRate = response.data.value;
                        }, function (err) {
                            console.log(err);
                        });
                }
            });


            MovieCharacterSvs.getMovieCharacter($state.params.longName)
                .then(function (response) {
                    if (response.success) {
                        $scope.contentLoaded = true;
                        $scope.character = response.character;
                        metaModel.image = $scope.character.imgUrl;
                        metaModel.name = $scope.character.name;
                        metaModel.actor = $scope.character.playedBy;
                        metaModel.movie = $scope.character.movies[0].name;
                        metaModel.year = $scope.character.movies[0].year;
                        $rootScope.metaTags.setCharacterMetaTags(metaModel);
                        $scope.userRate = response.userRate;
                        $anchorScroll();
                        $scope.rateAverage = $scope.character.ratesValue > 0
                            ? helperSvc.decimalRound($scope.character.ratesValue / $scope.character.ratesCount, 1)
                            : 0;

                        $scope.fullName = $scope.character.name + ' played by ' + $scope.character.playedBy + ' in ' + $scope.character.movies[0].name;

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
                FB.ui({
                    method: 'feed',
                   display: 'popup',
                    //href: $scope.dataHref(),
                  //  caption: 'Rate for ' + $scope.character.name.toUpperCase(),
                   // link: $scope.dataHref(),
                    name:'aaaaaaaaaaaaaaaaa',
                    picture: $scope.character.imgUrl,
                    caption: caption,
                    description: description,
                    thumbnail:$scope.character.imgUrl
                });
                //FB.ui({
                //    method: 'share_open_graph',
                //    action_type: 'og.likes',
                //    action_properties: JSON.stringify({
                //        object: $scope.dataHref(),
                //    })
                //}, function(response){
                //    debugger
                //});
            };

            $scope.$watch('userRate', function (newVal, oldVal) {
                if (newVal && newVal != oldVal) {
                    $scope.rateValue = newVal;
                }
            });
        }]);
})();