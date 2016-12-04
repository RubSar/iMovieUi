/**
 * Created by Toshiba on 10/31/2016.
 */
//movieCharactersListCtrl.js

(function () {
    angular.module('iMovieUi').controller('MovieCharactersListCtrl', function ($scope, $timeout, MovieCharacterSvs, RateSvc, helperSvc, $auth) {

        $scope.contentLoaded = false;

        $scope.paging = {};
        $scope.paging.number = 1;
        $scope.paging.size = 10;
        $scope.filteredBy =undefined;
        $scope.predicate='movie';

        $scope.isAuthenticated = function(){
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
            .then(function(response){
                $scope.movies = response.data;
            }, function(err){
                console.log(err);
            });

        $scope.search = function(form){
            if ($scope.searchForm.$valid) {
                var model ={
                    term:$scope.searchTerm,
                    predicate:$scope.predicate
                };
                console.log(model);
            }else{
                return;
            }
        };

        $scope.$watch('paging.number', function(newVal, oldVal){
            if (newVal) {
                $scope.contentLoaded = false;
                MovieCharacterSvs.getCharactersList($scope.paging)
                    .then(function (response) {
                        $scope.originalMovieCharacters =response.data;
                        $scope.listCharacters = helperSvc.chunk(response.data, 2);
                        $scope.count = response.count;
                        $scope.contentLoaded = true;
                    },
                    function (msg) {
                        console.log(msg);
                    });
            }
        }, true);

        $scope.$watch('isAuthProp', function(newVal, oldVal){
            if (newVal) {
                getUserRates();
            }

        }, true);

        $scope.$watch('originalMovieCharacters', function(newVal, oldVal){
            if (!!newVal) {
                getUserRates();
            }
        }, true);

        $scope.$watch('artist', function (newValue, oldValue) {
            if (!!newValue && newValue != oldValue) {
                MovieCharacterSvs.getCharactersByArtist($scope.artist._id)
                    .then(function (response) {
                        $scope.originalMovieCharacters =response.data;
                        $scope.count =response.data.length;
                        $scope.listCharacters = helperSvc.chunk(response.data, 2);

                        $scope.filteredBy ={
                            key:'By Artist',
                            value:newValue._id
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
                        $scope.originalMovieCharacters =response.data;
                        $scope.count =response.data.length;
                        $scope.listCharacters = helperSvc.chunk(response.data, 2);
                        $scope.filteredBy ={
                            key:'By Year',
                            value:newValue._id[0]
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
                        $scope.originalMovieCharacters =response.data;
                        $scope.count =response.data.length;
                        $scope.listCharacters = helperSvc.chunk(response.data, 2);
                        $scope.filteredBy ={
                            key:'By Movie',
                            value:newValue._id[0]
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

        function getUserRates(){
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

    })
})();


