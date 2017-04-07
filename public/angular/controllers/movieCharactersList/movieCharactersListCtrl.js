/**
 * Created by Ruben on 10/31/2016.
 */
//movieCharactersListCtrl.js

(function () {
    angular.module('iMovieUi').controller('MovieCharactersListCtrl', ['$scope', '$rootScope', '$timeout', '$state', 'MovieCharacterSvs', 'RateSvc', 'helperSvc', '$auth', '$window',
        function ($scope, $rootScope, $timeout, $state, MovieCharacterSvs, RateSvc, helperSvc, $auth, $window) {

            $scope.contentLoaded = false;
            $scope.filteredBy = {};
            $scope.model = {
                page: $state.params.page || 1
            };
            if ($state.params.key && $state.params.value) {
                $scope.model.key = $state.params.key;
                $scope.model.value = $state.params.value;
            }

            updateResults();


            //only for input form
            $scope.searchTerm = $scope._searchTerm ? decodeURI($scope._searchTerm) : '';

            $scope.isAuthenticated = function () {
                return $auth.isAuthenticated();
            };

            //getting top artists
            MovieCharacterSvs.getArtists()
                .then(function (response) {
                    $scope.artists = response.data;
                },
                function (err) {
                    console.log(err);
                });

            //getting top years
            MovieCharacterSvs.getOrderedYears()
                .then(function (response) {
                    $scope.years = response.data;
                }, function (err) {
                    console.log(err);
                });

            //getting top movies
            MovieCharacterSvs.getMovies()
                .then(function (response) {
                    $scope.movies = response.data;
                }, function (err) {
                    console.log(err);
                });


            //$scope.$on('new-search', function (event, args) {
            //
            //    MovieCharacterSvs.searchCharacters({term: args.term})
            //        .then(function (response) {
            //            if (response.data.length > 0) {
            //                $scope.notFoundForTerm = false;
            //                $scope.originalMovieCharacters = response.data;
            //                $scope.listCharacters = helperSvc.chunk(response.data, 2);
            //            } else {
            //                $scope.notFoundForTerm = true;
            //                $scope.listCharacters = [];
            //
            //            }
            //            $scope.count = 0;
            //            $scope.contentLoaded = true;
            //            $scope.filteredBy = {
            //                key: 'Searched By',
            //                value: decodeURI(args.term)
            //            };
            //        },
            //        function (msg) {
            //            console.log(msg);
            //        });
            //
            //});

            $scope.getAll = function () {
                var _concat = '?term=' + $scope._searchTerm;
                var _href = $window.location.href;
                if (_href.indexOf('?term=')) {
                    window.location.href = _href.replace(_concat, '');
                }
                $scope.filteredBy = undefined;
                $scope._searchTerm = undefined;

                MovieCharacterSvs.getCharactersList({page: 1, term: 'movies.name', value: 'The Dark Knight'})
                    .then(function (response) {
                        $scope.originalMovieCharacters = response.data;
                        $scope.listCharacters = helperSvc.chunk(response.data, 2);
                        $scope.count = response.count;
                        $scope.contentLoaded = true;
                    }, function (msg) {
                        console.log(msg);
                    });
            };


            $scope.pagingChange = function (params) {

                $state.go('movieCharactersList', {
                    page: params.page
                }, {notify: false});

               // $scope.model.page = params.page;
                $timeout(function(){
                    updateResults();
                });

            };

            $scope.$watch('isAuthProp', function (newVal, oldVal) {
                if (newVal) {
                    getUserRates();
                }
            }, true);

            $scope.setModel = function (param) {
                console.log('-------------ssdsdsdsd');
                $state.go('movieCharactersList', {
                    page: 1,
                    key: param.term,
                    value: param.value
                }, {notify: false});
                param.page = 1;

                $scope.model = {
                    page: 1,
                    key: param.term,
                    value: param.value
                };

                updateResults();

            };

            $scope.$watch('model.page', function (newVal, oldVal, event) {
                console.log('--------------' + newVal);
            }, true);

            $scope.$watch('originalMovieCharacters', function (newVal, oldVal) {
                if (!!newVal) {
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

            function updateResults() {
                $scope.contentLoaded = false;
                if ($scope.model.key) {
                    $scope.filteredBy.key = 'movie';

                }
                MovieCharacterSvs.getCharactersList($scope.model)
                    .then(function (response) {
                        $scope.originalMovieCharacters = response.data;
                        $scope.listCharacters = helperSvc.chunk(response.data, 2);
                        $scope.count = response.count;
                        $scope.contentLoaded = true;
                    },
                    function (msg) {
                        console.log(msg);
                    });
            }

        }])
})();


