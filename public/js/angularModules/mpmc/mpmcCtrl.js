/**
 * Created by Toshiba on 10/31/2016.
 */
//mpmcCtrl.js

(function(){
    angular.module('mpmcApp').controller('mpmcCtrl', function($scope, $timeout, mpmcSvc){

        $scope.contentLoaded =false;

        mpmcSvc.getTopCharacters().then(
            function(response){
                $scope.topCharacters =response.data;
                $timeout(function(){
                    $scope.contentLoaded =true;
                }, 2000)
            },
            function(msg){
                console.log(msg);
            }
        );

        mpmcSvc.getArtists().then(
            function(response){
                debugger;
                $scope.artists=response.data;
            },
            function(err){
                console.log(err);
            }
        );

        $scope.getArtistMovies = function(artist){
            console.log(artist);
        }

    })
})();