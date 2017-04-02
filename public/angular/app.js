/**
 * Created by Ruben on 11/11/2016.
 */
(function () {
    angular.module('iMovieUi', ['satellizer', 'ui.router'])
        .config(['$authProvider','$httpProvider', '$stateProvider',function ($authProvider, $httpProvider, $stateProvider) {
            $httpProvider.interceptors.push('authInterceptor');
            $authProvider.facebook({
                clientId: '175488799579769'
            });

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: '/public/angular/controllers/home/home.html',
                    controller: 'HomeCtrl'
                })
                .state('userRates', {
                    url: '/myRates',
                    templateUrl: '/public/angular/controllers/userRates/user.rates.html',
                    controller: 'UserRatesCtrl'
                })
                .state('comicsCharacter', {
                    url: '/comics-character/:comicsCharacterName',
                    templateUrl: '/public/angular/controllers/comicsCharacter/comics.character.html',
                    controller: 'ComicsCharacterCtrl'
                })
                .state('movieCharacter', {
                    url: '/movie-character/:movieCharacter',
                    templateUrl: '/public/angular/controllers/movieCharacter/movie.character.html',
                    controller: 'MovieCharacterCtrl'
                })
                .state('movieCharactersList', {
                    url: '/most-popular-movie-characters',
                    templateUrl: '/public/angular/controllers/movieCharactersList/movie.characters.list.html',
                    controller: 'MovieCharactersListCtrl'
                })

        }]);

})();