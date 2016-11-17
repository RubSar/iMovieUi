/**
 * Created by Ruben on 10/31/2016.
 */
//movieCharactersSvs.js

(function () {
    angular.module('iMovieUi').factory('MovieCharacterSvs', function (helperSvc) {

        function getAll(){
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/all'});
        }

        function getTopCharacters() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/top'});
        }

        function getArtists() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/artists'});
        }

        function getOrderedYears(){
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/years'});
        }

        function getCharactersByArtist(artist) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/byArtist', params:{artist:artist}});
        }

        function getCharactersByMovieReleaseDate(year){
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/byYear', params:{year:year}});
        }

        function getCharactersList(paging){
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/list', params:paging});
        }


        return {
            getAll:getAll,
            getTopCharacters: getTopCharacters,
            getArtists: getArtists,
            getCharactersByArtist: getCharactersByArtist,
            getCharactersByMovieReleaseDate:getCharactersByMovieReleaseDate,
            getOrderedYears:getOrderedYears,
            getCharactersList:getCharactersList
        }
    })
})();