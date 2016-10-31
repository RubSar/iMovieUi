/**
 * Created by Toshiba on 10/31/2016.
 */
//mpmcSvc.js

(function(){
    angular.module('mpmcApp').factory('mpmcSvc', function(helperSvc){

        function getTopCharacters(){
          return helperSvc.requestHandler({method:'GET', url:'/api/movieCharacters/top'});
        }

        return{
            getTopCharacters:getTopCharacters
        }
    })
})();