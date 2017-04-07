/**
 * Created by Ruben on 10/31/2016.
 */
//movieCharactersSvs.js

(function () {
    angular.module('iMovieUi').factory('MovieCharacterSvs', ['helperSvc', '$httpParamSerializerJQLike', function (helperSvc, $httpParamSerializerJQLike) {

        var params = $httpParamSerializerJQLike;

        function getAll() {

            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/all'});
        }

        function getTopCharacters() {

            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/top'});
        }

        function getArtists() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/artists'});
        }

        function getMovies() {
            var params = $httpParamSerializerJQLike;
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/movies'})
        }

        function getOrderedYears() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/years'});
        }

        function getCharactersByArtist(artist) {
            return helperSvc.requestHandler({
                method: 'GET',
                url: '/api/movieCharacters/byArtist',
                params: {artist: artist}
            });
        }

        function getCharactersByMovieReleaseDate(year) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/byYear', params: {year: year}});
        }

        function getCharactersByMovie(movieName) {
            return helperSvc.requestHandler({
                method: 'GET',
                url: '/api/movieCharacters/byMovie',
                params: {movieName: movieName}
            });
        }

        function getCharactersList(model) {
            return helperSvc.requestHandler({
                method: 'GET',
                url: '/api/movieCharacters/list',
                params: model
            });
        }

        function getMovieCharacter(name) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/single', params: {name: name}});
        }

        function searchCharacters(model) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/search', params: model});
        }

        function getRecommended(model) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/recommended', params: model});
        }

        return {
            getAll: getAll,
            getTopCharacters: getTopCharacters,
            getArtists: getArtists,
            getMovies: getMovies,
            getCharactersByMovie: getCharactersByMovie,
            getCharactersByArtist: getCharactersByArtist,
            getCharactersByMovieReleaseDate: getCharactersByMovieReleaseDate,
            getOrderedYears: getOrderedYears,
            getCharactersList: getCharactersList,
            getMovieCharacter: getMovieCharacter,
            getRecommended: getRecommended,
            searchCharacters: searchCharacters
        }
    }])
})();