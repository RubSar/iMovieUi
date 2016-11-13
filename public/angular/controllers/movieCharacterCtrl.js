/**
 * Created by Toshiba on 10/31/2016.
 */
//movieCharacterCtrl.js

(function () {
    angular.module('iMovieUi').controller('MovieCharacterCtrl', function ($scope, $timeout, MovieCharacterSvs, helperSvc) {

        $scope.contentLoaded = false;

        MovieCharacterSvs.getTopCharacters()
            .then(function (response) {
                $scope.topCharacters = helperSvc.chunk(response.data, 2);
                $scope.contentLoaded = true;
            },
            function (msg) {
                console.log(msg);
            });

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


        $scope.$watch('artist', function (newValue, oldValue) {
            if (!!newValue && newValue != oldValue) {
                MovieCharacterSvs.getCharactersByArtist($scope.artist._id)
                    .then(function (response) {
                        $scope.topCharacters = helperSvc.chunk(response.data, 2);
                    },
                    function (err) {
                        console.log(err);
                    });
            }

        });

        $scope.getAll = function () {
            MovieCharacterSvs.getAll()
                .then(function (response) {
                    $scope.topCharacters = helperSvc.chunk(response.data, 2);
                }, function (err) {
                    console.log(err);
                })
        };

        $scope.$watch('year', function (newValue, oldValue) {
            if (!!newValue && newValue != oldValue) {
                MovieCharacterSvs.getCharactersByMovieReleaseDate(newValue._id[0])
                    .then(function (response) {
                        $scope.topCharacters = helperSvc.chunk(response.data, 2);
                    },
                    function (err) {
                        console.log(err);
                    });
            }

        });

    })
})();