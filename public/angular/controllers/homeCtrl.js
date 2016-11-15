/**
 * Created by Toshiba on 11/12/2016.
 */

(function () {
    'use strict';

    angular.module('iMovieUi').controller('HomeCtrl', function ($scope, MovieCharacterSvs, ComicsCharactersSvc, helperSvc, RateSvc) {
        //get movie characters
        MovieCharacterSvs.getTopCharacters()
            .then(function(response){
                $scope.originalMovieCharacters=response.data;
            }, function(err){
                console.log(err);
            });

        $scope.$watch('originalMovieCharacters', function(newVal, oldVal){
            if (newVal) {
                $scope.movieCharacters =helperSvc.chunk(newVal, 2);
                $scope.movieCharacterIds = newVal.map(function(a) {return {_id:a._id};});

                RateSvc.userRatesForMovies($scope.movieCharacterIds)
                    .then(function(response){
                        if (response.success) {
                           insertUserRating(response.data);
                        }
                    }, function(err){
                        console.log(err);
                    });
            }
        }, true);

        //get comics characters
        ComicsCharactersSvc.getAll()
            .then(function(response){
                $scope.comicsCharacters =response.data;
            }, function(err){
                console.log(err);
            });

        //TODO: improve implementation letter
        function insertUserRating(userRates){
            for(var i =0; i<userRates.length; i++){
                for(var j =0; j<$scope.originalMovieCharacters; j++){
                    if (userRates[i].characterId ==$scope.originalMovieCharacters[j]._id) {
                        console.log('yap');
                        $scope.originalMovieCharacters[j].userRate = userRates[i].value;
                    }
                }
            }
            console.log($scope.originalMovieCharacters);
        }



    });
})();