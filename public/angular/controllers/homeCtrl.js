/**
 * Created by Toshiba on 11/12/2016.
 */

(function () {
    'use strict';

    angular.module('iMovieUi').controller('HomeCtrl', function ($scope, MovieCharacterSvs, ComicsCharactersSvc, helperSvc) {
        //get movie characters
        MovieCharacterSvs.getTopCharacters()
            .then(function(response){
                $scope.movieCharacters =helperSvc.chunk(response.data, 2);
            }, function(err){
                console.log(err);
            });
        //get comics characters
        ComicsCharactersSvc.getAll()
            .then(function(response){
                $scope.comicsCharacters =response.data;
            }, function(err){
                console.log(err);
            });




    });
})();