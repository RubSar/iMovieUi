/**
 * Created by Ruben on 11/12/2016.
 */

(function () {
    'use strict';

    angular.module('iMovieUi').controller('HomeCtrl', ['$scope', '$rootScope', '$timeout', '$window', 'MovieCharacterSvs', 'TvSeriesCharacterSvs', 'ComicCharactersSvc', 'helperSvc', 'RateSvc', '$auth', '$location', 'MetaTagsService',
        function ($scope, $rootScope, $timeout, $window, MovieCharacterSvs, TvSeriesCharacterSvs, ComicCharactersSvc, helperSvc, RateSvc, $auth, $location, MetaTagsService) {

            //init page title
            $rootScope.metaTags= $rootScope.metaTags || MetaTagsService;
            $rootScope.metaTags.setHomeMetaTags();

            //get movie characters
            $scope.comicCharactersLoaded = false;
            $scope.movieCharactersLoaded = false;
            $scope.tvSeriesCharactersLoaded = false;
            $scope.authState = false;





            //getting top movie characters
            MovieCharacterSvs.getTopCharacters()
                .then(function (response) {
                    $scope.originalMovieCharacters = response.data;
                    $scope.movieCharactersLoaded = true;
                }, function (err) {
                    console.log(err);
                });

            //getting top tv-series characters
            TvSeriesCharacterSvs.topCharacters()
                .then(function (response) {
                    $scope.originalTvSeriesCharacters = response.data;
                    $scope.tvSeriesCharactersLoaded = true;
                }, function (err) {
                    console.log(err);
                });

            //getting comic characters
            ComicCharactersSvc.getAll()
                .then(function (response) {
                    $scope.comicCharacters = response.data;
                    $timeout(function () {
                        $scope.comicCharactersLoaded = true;
                    }, 400);
                }, function (err) {
                    console.log(err);
                });


            $scope.$watch('originalMovieCharacters', function (newVal, oldVal) {
                if (!!newVal) {
                    $scope.movieCharacters = helperSvc.chunk(newVal, 2);
                    getMovieCharactersUserRates();
                }
            }, true);
            $scope.$watch('originalTvSeriesCharacters', function (newVal, oldVal) {
                if (!!newVal) {
                    $scope.tvSeriesCharacters = helperSvc.chunk(newVal, 2);
                    getTvSeriesCharactersUserRates();
                }
            }, true);

            $scope.dataHref = function () {
                var url = $location.absUrl();
                return url.replace('localhost:3000', 'imovieui.com');
            };

            $scope.shareOnFacebook = function () {
                //var caption = ($auth.isAuthenticated() && !!$scope.userRate) ? 'My rating ' + $scope.userRate + ', ' : '';
                //var description = $scope.character.name + ' is a character from ' + $scope.character.movies[0].name + ' (' + $scope.character.movies[0].year + '). '
                //    + 'He is portrayed by ' + $scope.character.playedBy + '. '
                //    + caption + ' Rate Average : ' + $scope.rateAverage + ', Rates count : ' + $scope.character.ratesCount;
                FB.ui({
                    method: 'share',
                    display: 'popup',
                    href: $scope.dataHref(),
                    title: 'Rate for sddddddddddd',
                    link: $scope.dataHref(),
                    picture: 'http://res.cloudinary.com/dk1chsp5h/image/upload/v1477912842/joker_jnneco.jpg',
                    caption: 'sssssssssssssssssssssssssss',
                    description: 'ssssssssssssssssssssssssssssssssss'
                });
                //FB.ui({
                //    method: 'feed',
                //    link: 'link of post',
                //    name: 'title of post',
                //    caption: 'description'
                //});
            };


            $scope.isAuthenticated = function () {
                return $auth.isAuthenticated();
            };


            $scope.$watch('authState', function (newVal, oldVal) {
                if (newVal) {
                    getMovieCharactersUserRates();
                    getTvSeriesCharactersUserRates();
                }
            }, true);


            //TODO: improve implementation letter
            function insertUserRatingForMC(userRates) {
                for (var i = 0; i < userRates.length; i++) {
                    for (var j = 0; j < $scope.originalMovieCharacters.length; j++) {
                        if (userRates[i].characterId == $scope.originalMovieCharacters[j]._id) {
                            $scope.originalMovieCharacters[j].userRate = userRates[i].value;
                        }
                    }
                }
            }

            function insertUserRatingForTSC(userRates) {
                for (var i = 0; i < userRates.length; i++) {
                    for (var j = 0; j < $scope.originalTvSeriesCharacters.length; j++) {
                        if (userRates[i].characterId == $scope.originalTvSeriesCharacters[j]._id) {
                            $scope.originalTvSeriesCharacters[j].userRate = userRates[i].value;
                        }
                    }
                }
            }

            //getting users rates for tv-series characters
            function getTvSeriesCharactersUserRates() {
                if (!!$scope.originalTvSeriesCharacters && $scope.authState) {
                    var movieCharacterIds = $scope.originalTvSeriesCharacters.map(function (a) {
                        return {_id: a._id};
                    });
                    RateSvc.userRatesForCharacters(movieCharacterIds)
                        .then(function (response) {
                            if (response.success) {
                                insertUserRatingForTSC(response.data);
                            }
                        }, function (err) {
                            console.log(err);
                        });
                }
            }

            //getting users rates for movie characters
            function getMovieCharactersUserRates() {
                if (!!$scope.originalMovieCharacters && $scope.authState) {
                    var movieCharacterIds = $scope.originalMovieCharacters.map(function (a) {
                        return {_id: a._id};
                    });
                    RateSvc.userRatesForCharacters(movieCharacterIds)
                        .then(function (response) {
                            if (response.success) {
                                insertUserRatingForMC(response.data);
                            }
                        }, function (err) {
                            console.log(err);
                        });
                }
            }


        }]);
})();