/**
 * Created by Ruben on 10/31/2016.
 */
//movieCharactersListCtrl.js

(function () {
    angular.module('iMovieUi').controller('MovieCharactersListCtrl', ['$scope', '$rootScope', '$timeout', '$state', '$anchorScroll', '$sce', 'MovieCharacterSvs', 'RateSvc', 'helperSvc', '$auth', '$window',
        function ($scope, $rootScope, $timeout, $state, $anchorScroll, $sce, MovieCharacterSvs, RateSvc, helperSvc, $auth, $window) {

            $scope.contentLoaded = false;
            $scope.model = {
                page: $state.params.page || 1
            };
            if ($state.params.key && $state.params.value) {
                $scope.model.key = $state.params.key;
                $scope.model.value = $state.params.value;
                if ($state.params.key === 'playedBy') {
                    $scope.pageHeader = $sce.trustAsHtml('list of <strong>' + $state.params.value + '</strong> top movie characters');
                    $window.document.title = 'iMovieUi: List of ' + $state.params.value + ' top characters';
                } else if ($state.params.key === 'movies.year') {
                    $scope.pageHeader = $sce.trustAsHtml('Top movie characters of <strong>' + $state.params.value + '</strong>');
                    $window.document.title = 'iMovieUi: Top Movie Characters of ' + $state.params.value;
                } else if ($state.params.key === 'movies.name') {
                    $scope.pageHeader = $sce.trustAsHtml('List of <strong>' + $state.params.value + '</strong> top movie characters');
                    $window.document.title = 'iMovieUi: List of ' + $state.params.value + ' top Characters';
                }
            } else {

                $window.document.title = 'iMovieUi: Most Popular Movie Characters';
                $scope.pageHeader = $sce.trustAsHtml('most popular <strong>movie characters</strong>');

            }

            updateResults();


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

            //get all movie characters
            $scope.getAll = function () {
                $scope.pageHeader = $sce.trustAsHtml('most popular <strong>movie characters</strong>');
                $window.document.title = 'iMovieUi: Most Popular Movie Characters';
                $state.go('movieCharactersList', {
                    page: 1
                }, {notify: false});
                $scope.model = {
                    page: 1,
                    key: null,
                    value: null
                };
                updateResults();
            };


            $scope.pagingChange = function (params) {
                if (!!$state.params.key) {
                    $state.go('movieCharactersList.sorted', {
                        page: params.page
                    }, {notify: false});
                } else {
                    $state.go('movieCharactersList', {
                        page: params.page
                    }, {notify: false});
                }

                $timeout(function () {
                    updateResults();
                });
            };

            $scope.$watch('authState', function (newVal, oldVal) {
                if (newVal) {
                    getUserRates();
                }
            }, true);

            $scope.setModel = function (param) {

                if (param.term === 'playedBy') {
                    $scope.pageHeader = $sce.trustAsHtml('list of <strong>' + param.value + '</strong> top movie characters');
                    $window.document.title = 'iMovieUi: List of ' + param.value + ' top characters';
                } else if (param.term === 'movies.year') {
                    $scope.pageHeader = $sce.trustAsHtml('Top movie characters of <strong>' + param.value + '</strong>');
                    $window.document.title = 'iMovieUi: Top Movie Characters of ' + param.value;
                } else if (param.term === 'movies.name') {
                    $scope.pageHeader = $sce.trustAsHtml('List of <strong>' + param.value + '</strong> top characters');
                    $window.document.title = 'iMovieUi: List of ' + param.value + ' top characters';
                }
                $state.go('movieCharactersList.sorted', {
                    page: 1,
                    key: param.term,
                    value: param.value
                }, {notify: false});

                $scope.model = {
                    page: 1,
                    key: param.term,
                    value: param.value
                };

                updateResults();

            };

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
                if (!!$scope.originalMovieCharacters && $scope.authState) {
                    var movieCharacterIds = $scope.originalMovieCharacters.map(function (a) {
                        return {_id: a._id};
                    });
                    RateSvc.userRatesForCharacters(movieCharacterIds)
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

                MovieCharacterSvs.getCharactersList($scope.model)
                    .then(function (response) {

                        $scope.originalMovieCharacters = response.data;
                        $scope.listCharacters = helperSvc.chunk(response.data, 2);
                        $scope.count = response.count;
                        $scope.contentLoaded = true;
                        $anchorScroll();

                    }, function (msg) {
                        console.log(msg);
                    });
            }

        }])
})();


