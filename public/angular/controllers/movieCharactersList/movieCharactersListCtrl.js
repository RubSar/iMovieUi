/**
 * Created by Ruben on 10/31/2016.
 */
//movieCharactersListCtrl.js

(function () {
    angular.module('iMovieUi').controller('MovieCharactersListCtrl', ['$scope', '$timeout', 'MovieCharacterSvs', 'RateSvc', 'helperSvc', '$auth', '$window',
        function ($scope, $timeout, MovieCharacterSvs, RateSvc, helperSvc, $auth, $window) {

            $scope.contentLoaded = false;

            $scope.paging = {};
            $scope.paging.number = 1;
            $scope.paging.size = 10;


            $scope._searchTerm = $window.location.href.split('?term=')[1];
            //only for input form
            $scope.searchTerm = $scope._searchTerm ? decodeURI($scope._searchTerm) : '';
            $scope.filteredBy = undefined;
            $scope.predicate = 'movie';

            $scope.isAuthenticated = function () {
                return $auth.isAuthenticated();
            };


            MovieCharacterSvs.getArtists()
                .then(function (response) {
                    $scope.artists = response.data;
                },
                function (err) {
                    console.log(err);
                });

            MovieCharacterSvs.getOrderedYears()
                .then(function (response) {
                    $scope.years = response.data;
                }, function (err) {
                    console.log(err);
                });

            MovieCharacterSvs.getMovies()
                .then(function (response) {
                    $scope.movies = response.data;
                }, function (err) {
                    console.log(err);
                });


            $scope.$on('new-search', function (event, args) {

                MovieCharacterSvs.searchCharacters({term: args.term})
                    .then(function (response) {
                        if (response.data.length > 0) {
                            $scope.notFoundForTerm = false;
                            $scope.originalMovieCharacters = response.data;
                            $scope.listCharacters = helperSvc.chunk(response.data, 2);
                        } else {
                            $scope.notFoundForTerm = true;
                            $scope.listCharacters=[];

                        }
                        $scope.count = 0;
                        $scope.contentLoaded = true;
                        $scope.filteredBy = {
                            key: 'Searched By',
                            value: decodeURI(args.term)
                        };
                    },
                    function (msg) {
                        console.log(msg);
                    });

            });

            $scope.getAll = function () {
                var _concat = '?term=' + $scope._searchTerm;
                var _href = $window.location.href;
                if (_href.indexOf('?term=')) {
                    window.location.href = _href.replace(_concat, '');
                }
                $scope.filteredBy = undefined;
                $scope._searchTerm = undefined;

                MovieCharacterSvs.getCharactersList($scope.paging)
                    .then(function (response) {
                        $scope.originalMovieCharacters = response.data;
                        $scope.listCharacters = helperSvc.chunk(response.data, 2);
                        $scope.count = response.count;
                        $scope.contentLoaded = true;
                    },
                    function (msg) {
                        console.log(msg);
                    });
            };

            $scope.$watch('paging.number', function (newVal, oldVal) {
                if (newVal) {
                    $scope.contentLoaded = false;
                    if (!$scope._searchTerm) {
                        MovieCharacterSvs.getCharactersList($scope.paging)
                            .then(function (response) {
                                $scope.originalMovieCharacters = response.data;
                                $scope.listCharacters = helperSvc.chunk(response.data, 2);
                                $scope.count = response.count;
                                $scope.contentLoaded = true;
                            },
                            function (msg) {
                                console.log(msg);
                            });
                    } else {
                        MovieCharacterSvs.searchCharacters({term: $scope._searchTerm})
                            .then(function (response) {
                                if (response.data.length > 0) {
                                    $scope.notFoundForTerm = false;
                                    $scope.originalMovieCharacters = response.data;
                                    $scope.listCharacters = helperSvc.chunk(response.data, 2);
                                    $scope.count = response.count;

                                } else {
                                    $scope.listCharacters=[];
                                    $scope.notFoundForTerm = true;
                                }
                                $scope.contentLoaded = true;


                                $scope.filteredBy = {
                                    key: 'Searched By',
                                    value: decodeURI($scope._searchTerm)
                                };
                            },
                            function (msg) {
                                console.log(msg);
                            });
                    }
                }
            }, true);

            $scope.$watch('isAuthProp', function (newVal, oldVal) {
                if (newVal) {
                    getUserRates();
                }

            }, true);

            $scope.$watch('originalMovieCharacters', function (newVal, oldVal) {
                if (!!newVal) {
                    getUserRates();
                }
            }, true);

            $scope.$watch('artist', function (newValue, oldValue) {
                if (!!newValue && newValue != oldValue) {
                    MovieCharacterSvs.getCharactersByArtist($scope.artist._id)
                        .then(function (response) {
                            $scope.originalMovieCharacters = response.data;
                            $scope.count = response.data.length;
                            $scope.listCharacters = helperSvc.chunk(response.data, 2);

                            $scope.filteredBy = {
                                key: 'Filtered By Artist',
                                value: newValue._id
                            }
                        },
                        function (err) {
                            console.log(err);
                        });
                }
            });

            $scope.$watch('year', function (newValue, oldValue) {
                if (!!newValue && newValue != oldValue) {
                    MovieCharacterSvs.getCharactersByMovieReleaseDate(newValue._id[0])
                        .then(function (response) {
                            $scope.originalMovieCharacters = response.data;
                            $scope.count = response.data.length;
                            $scope.listCharacters = helperSvc.chunk(response.data, 2);
                            $scope.filteredBy = {
                                key: 'Filtered By Year',
                                value: newValue._id[0]
                            }
                        },
                        function (err) {
                            console.log(err);
                        });
                }
            });

            $scope.$watch('movie', function (newValue, oldValue) {
                if (!!newValue && newValue != oldValue) {
                    MovieCharacterSvs.getCharactersByMovie(newValue._id[0])
                        .then(function (response) {
                            $scope.originalMovieCharacters = response.data;
                            $scope.count = response.data.length;
                            $scope.listCharacters = helperSvc.chunk(response.data, 2);
                            $scope.filteredBy = {
                                key: 'Filtered By Movie',
                                value: newValue._id[0]
                            }
                        },
                        function (err) {
                            console.log(err);
                        });
                }
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

        }])
})();


