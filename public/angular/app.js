/**
 * Created by User on 11/11/2016.
 */
(function () {
    angular.module('iMovieUi', ['satellizer', 'ui.bootstrap'])
        .config(function ($authProvider, $httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
            $authProvider.facebook({
                clientId: '175488799579769'
            });
        });

})();