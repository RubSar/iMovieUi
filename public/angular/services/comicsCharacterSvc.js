/**
 * Created by Toshiba on 11/12/2016.
 */

(function () {
    'use strict';

    angular.module('iMovieUi').factory('ComicsCharactersSvc', function (helperSvc) {

       function getAll(){
           return helperSvc.requestHandler({method: 'GET', url: '/api/comicsCharacters/all'});
       }

        function getSingle(name){
            return helperSvc.requestHandler({method: 'GET', url: '/api/comicsCharacters/single', params:{name:name}});
        }

       return{
           getAll:getAll,
           getSingle:getSingle
       }
    });
})();