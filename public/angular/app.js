/**
 * Created by User on 11/11/2016.
 */
(function () {
    var app = angular.module('iMovieUi', ['satellizer'])
        .config(function ($authProvider, $httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
            $authProvider.facebook({
                clientId: '175488799579769'
            });
        });


})();