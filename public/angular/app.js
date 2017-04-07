/**
 * Created by Ruben on 11/11/2016.
 */
(function () {
    angular.module('iMovieUi', ['satellizer', 'ui.router'])
        .config(['$authProvider', '$httpProvider', '$stateProvider', '$locationProvider', function ($authProvider, $httpProvider, $stateProvider, $locationProvider) {
            $httpProvider.interceptors.push('authInterceptor');
            $authProvider.facebook({
                clientId: '175488799579769'
            });

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: '/angular/controllers/home/home.html',
                    controller: 'HomeCtrl'
                })
                .state('userRates', {
                    url: '/myRates',
                    templateUrl: 'angular/controllers/userRates/user.rates.html',
                    controller: 'UserRatesCtrl'
                })
                .state('comicsCharacter', {
                    url: '/comics-character/:name',
                    templateUrl: '/angular/controllers/comicsCharacter/comics.character.html',
                    controller: 'ComicsCharacterCtrl'
                })
                .state('movieCharacter', {
                    url: '/movie-character/:longName',
                    templateUrl: '/angular/controllers/movieCharacter/movie.character.html',
                    controller: 'MovieCharacterCtrl'
                })
                .state('movieCharactersList', {
                    url: '/most-popular-movie-characters?page&key&value',
                    params: {
                        page: "1"
                    },
                    templateUrl: '/angular/controllers/movieCharactersList/movie.characters.list.html',
                    controller: 'MovieCharactersListCtrl'
                })
                .state('tvSeriesCharactersList', {
                    url: '/most-popular-tv-series-characters?page&count&filter',
                    templateUrl: '/angular/controllers/tvSeriesCharactersList/tv.series.characters.list.html',
                    controller: 'TvSeriesCharactersListCtrl'
                });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

        }]);

})();