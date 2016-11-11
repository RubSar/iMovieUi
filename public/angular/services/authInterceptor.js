/**
 * Created by User on 11/11/2016.
 */
(function () {
    var app = angular.module('iMovieUi')
        .factory('authInterceptor', function (authToken) {
            return {
                request: function(config) {
                    var token = authToken.getToken();

                    if (token)
                        config.headers.Authorization = 'Bearer ' + token;

                    return config;
                },
                response: function(response) {
                    return response;
                }
            };
        })
})();