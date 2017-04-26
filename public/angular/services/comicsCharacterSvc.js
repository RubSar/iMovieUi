/**
 * Created by Ruben on 11/12/2016.
 */

(function () {
    'use strict';

    angular.module('iMovieUi').factory('ComicsCharactersSvc', ['helperSvc', function (helperSvc) {

        function getAll() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/comicsCharacters/all'});
        }

        function getSingle(name) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/comicsCharacters/single', params: {name: name}});
        }

        function search(model) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/comicsCharacters/search', params: model});
        }


        return {
            getAll: getAll,
            getSingle: getSingle,
            search: search
        }
    }]);
})();