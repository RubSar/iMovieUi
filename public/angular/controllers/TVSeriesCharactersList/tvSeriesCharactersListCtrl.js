//tvSeriesCharactersListCtrl.js

(function () {
    angular.module('iMovieUi').controller('TvSeriesCharactersListCtrl', ['$scope', '$rootScope', '$timeout', '$state','$anchorScroll', 'TvSeriesCharacterSvs', 'RateSvc', 'helperSvc', '$auth', '$window',
        function ($scope, $rootScope, $timeout, $state, $anchorScroll, TvSeriesCharacterSvs, RateSvc, helperSvc, $auth, $window) {

            $scope.contentLoaded = false;
            $window.document.title = 'iMovieUi: Most Popular TV-Series Characters';
            $scope.filteredBy = {};
            $scope.model = {
                page: $state.params.page || 1
            };
            if ($state.params.key && $state.params.value) {
                $scope.model.key = $state.params.key;
                $scope.model.value = $state.params.value;
                $window.document.title = 'iMovieUi: List of ' + $state.params.value + ' characters';
            }else{
                $window.document.title = 'iMovieUi: Most Popular TV-Series Characters';
            }

            updateResults();


            //only for input form
            $scope.searchTerm = $scope._searchTerm ? decodeURI($scope._searchTerm) : '';

            $scope.isAuthenticated = function () {
                return $auth.isAuthenticated();
            };

            //getting top movies
            TvSeriesCharacterSvs.movies()
                .then(function (response) {
                    $scope.movies = response.data;
                }, function (err) {
                    console.log(err);
                });


            //get all movie characters
            $scope.getAll = function () {
                $window.document.title = 'iMovieUi: Most Popular TV-Series Characters';

                $state.go('tvSeriesCharactersList', {
                    page: 1,
                    key: undefined,
                    value: undefined
                }, {notify: false});
                $scope.filteredBy = undefined;
                $scope._searchTerm = undefined;

                $scope.model = {
                    page: 1,
                    key: null,
                    value: null
                };
                updateResults();
            };


            $scope.pagingChange = function (params) {
                if (!!$state.params.key) {
                    $state.go('tvSeriesCharactersList.sorted', {
                        page: params.page
                    }, {notify: false});
                } else {
                    $state.go('tvSeriesCharactersList', {
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
                $window.document.title = 'iMovieUi: List of ' +  param.value + ' characters';
                $state.go('tvSeriesCharactersList.sorted', {
                    page: 1,
                    key:param.term,
                    value:param.value
                }, {notify: false});
                param.page = 1;

                $scope.model = {
                    page: 1,
                    key: param.term,
                    value: param.value
                };

                updateResults();

            };

            $scope.$watch('originalCharacters', function (newVal, oldVal) {
                if (!!newVal) {
                    getUserRates();
                }
            }, true);


            //TODO: improve implementation letter
            function insertUserRating(userRates) {
                for (var i = 0; i < userRates.length; i++) {
                    for (var j = 0; j < $scope.originalCharacters.length; j++) {
                        if (userRates[i].characterId == $scope.originalCharacters[j]._id) {
                            $scope.originalCharacters[j].userRate = userRates[i].value;
                        }
                    }
                }
            }

            function getUserRates() {
                if (!!$scope.originalCharacters && $scope.authState) {
                    var movieCharacterIds = $scope.originalCharacters.map(function (a) {
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
                TvSeriesCharacterSvs.charactersList($scope.model)
                    .then(function (response) {
                        $scope.originalCharacters = response.data;
                        $scope.listCharacters = helperSvc.chunk(response.data, 2);
                        $scope.count = response.count;
                        $scope.contentLoaded = true;
                        $anchorScroll();
                    },
                    function (msg) {
                        console.log(msg);
                    });
            }

        }])
})();


