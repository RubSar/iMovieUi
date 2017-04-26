/**
 * Created by Ruben on 10/31/2016.
 */
//movieCharactersSvs.js

(function () {
    angular.module('iMovieUi').factory('MovieCharacterSvs', ['helperSvc', function (helperSvc) {


        function getTopCharacters() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/top'});
        }

        function getArtists() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/artists'});
        }

        function getMovies() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/movies'})
        }

        function getOrderedYears() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/years'});
        }

        function getCharactersList(model) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/list', params: model});
        }

        function getMovieCharacter(name) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/single', params: {name: name}});
        }

        function search(model) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/search', params: model});
        }

        function getRecommended(model) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/recommended', params: model});
        }

        return {
            getTopCharacters: getTopCharacters,
            getArtists: getArtists,
            getMovies: getMovies,
            getOrderedYears: getOrderedYears,
            getCharactersList: getCharactersList,
            getMovieCharacter: getMovieCharacter,
            getRecommended: getRecommended,
            search: search
        }
    }])
})();