/**
 * Created by Toshiba on 10/31/2016.
 */
//mpmcCtrl.js

(function(){
    angular.module('mpmcApp').controller('mpmcCtrl', function($scope, mpmcSvc){

        mpmcSvc.getTopCharacters().then(
            function(response){
                $scope.topCharacters =response;
            }, function(msg){
                console.log(msg);
            });

    })
})();