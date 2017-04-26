/**
 * Created by Ruben on 10/31/2016.
 */
//movieCharactersSvs.js

(function () {
    angular.module('iMovieUi').factory('TvSeriesCharacterSvs', ['helperSvc', function (helperSvc) {


        function topCharacters() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/tvSeriesCharacter/top'});
        }

        function movies() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/tvSeriesCharacter/movies'})
        }

        function charactersList(model) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/tvSeriesCharacter/list', params: model});
        }

        function tvSeriesCharacter(name) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/tvSeriesCharacter/single', params: {name: name}});
        }

        function searchCharacters(model) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/tvSeriesCharacter/search', params: model});
        }

        function recommended(model) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/tvSeriesCharacter/recommended', params: model});
        }

        return {
            topCharacters: topCharacters,
            movies: movies,
            charactersList: charactersList,
            tvSeriesCharacter: tvSeriesCharacter,
            getRecommended: recommended,
            searchCharacters: searchCharacters
        }
    }])
})();