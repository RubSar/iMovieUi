/**
 * Created by Toshiba on 10/31/2016.
 */
//mpmcCtrl.js

(function () {
    angular.module('iMovieUiApp').controller('mpmcCtrl', function ($scope, $timeout, mpmcSvc) {

        $scope.contentLoaded = false;

        mpmcSvc.getTopCharacters()
            .then(function (response) {
                $scope.topCharacters = response.data;
                $timeout(function () {
                    $scope.contentLoaded = true;
                }, 2000)
            },
            function (msg) {
                console.log(msg);
            });

        mpmcSvc.getArtists()
            .then(function (response) {
                $scope.artists = response.data;
            },
            function (err) {
                console.log(err);
            });

        mpmcSvc.getOrderedYears()
            .then(function (response) {
                $scope.years = response.data;
            }, function (err) {
                console.log(err);
            });


        $scope.$watch('artist', function (newValue, oldValue) {
            if (!!newValue && newValue != oldValue) {
                mpmcSvc.getCharactersByArtist($scope.artist._id)
                    .then(function (response) {
                        $scope.topCharacters = response.data;
                    },
                    function (err) {
                        console.log(err);
                    });
            }

        });

        $scope.getAll = function () {
            mpmcSvc.getAll()
                .then(function (response) {
                    $scope.topCharacters = response.data;
                }, function (err) {
                    console.log(err);
                })
        };

        $scope.$watch('year', function (newValue, oldValue) {
            if (!!newValue && newValue != oldValue) {
                mpmcSvc.getCharactersByMovieReleaseDate(newValue._id[0])
                    .then(function (response) {
                        $scope.topCharacters = response.data;
                    },
                    function (err) {
                        console.log(err);
                    });
            }

        });

    })
})();