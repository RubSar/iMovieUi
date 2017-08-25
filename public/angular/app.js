/**
 * Created by Ruben on 11/11/2016.
 */
(function () {
    angular.module('iMovieUi', ['satellizer', 'ui.router', '720kb.socialshare'])
        .config(['$authProvider', '$httpProvider', '$stateProvider', '$locationProvider', '$urlRouterProvider',
            function ($authProvider, $httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
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
                    templateUrl: '/angular/controllers/userRates/user.rates.html',
                    controller: 'UserRatesCtrl'
                })
                .state('search', {
                    url: '/search?term',
                    templateUrl: '/angular/controllers/search/search.html',
                    controller: 'SearchCtrl'
                })
                .state('comicCharacter', {
                    url: '/comic-character/:name',
                    templateUrl: '/angular/controllers/comicCharacter/comic.character.html',
                    controller: 'ComicCharacterCtrl'
                })
                .state('character', {
                    url: '/character/:longName',
                    templateUrl: '/angular/controllers/character/character.html',
                    controller: 'CharacterCtrl'
                })
                .state('movieCharactersList', {
                    url: '/most-popular-movie-characters?page',
                    templateUrl: '/angular/controllers/movieCharactersList/movie.characters.list.html',
                    controller: 'MovieCharactersListCtrl'
                })
                .state('movieCharactersList.sorted', {
                    url: '/:key/:value',
                    templateUrl: '/angular/controllers/movieCharactersList/movie.characters.list.html',
                    controller: 'MovieCharactersListCtrl'
                })
                .state('tvSeriesCharactersList', {
                    url: '/most-popular-tv-series-characters?page',
                    templateUrl: '/angular/controllers/tvSeriesCharactersList/tv.series.characters.list.html',
                    controller: 'TvSeriesCharactersListCtrl'
                })
                .state('tvSeriesCharactersList.sorted', {
                    url: '/:key/:value',
                    templateUrl: '/angular/controllers/tvSeriesCharactersList/tv.series.characters.list.html',
                    controller: 'TvSeriesCharactersListCtrl'
                });


            $urlRouterProvider.otherwise('/');

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });



        }])
        .run(['$window', function($window){

            $window.fbAsyncInit = function() {
                FB.init({
                    appId: '175488799579769',
                    status: true,
                    cookie: false,
                    xfbml: false,
                    version: 'v3.0'
                });
            };

            (function(d){
                // load the Facebook javascript SDK

                var js,
                    id = 'facebook-jssdk',
                    ref = d.getElementsByTagName('script')[0];

                if (d.getElementById(id)) {
                    return;
                }

                js = d.createElement('script');
                js.id = id;
                js.async = true;
                js.src = "//connect.facebook.net/en_US/all.js";

                ref.parentNode.insertBefore(js, ref);

            }(document));
        }])

})();