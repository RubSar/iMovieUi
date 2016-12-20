/**
 * Created by Ruben on 11/11/2016.
 */
(function () {
    angular.module('iMovieUi')
        .factory('authInterceptor',['authToken', function (authToken) {
            return {
                request: function (config) {
                    var token = authToken.getToken();

                    console.log(token);
                    if (token)
                        config.headers.Authorization = 'Bearer ' + token;

                    return config;
                },
                response: function (response) {
                    return response;
                }
            };
        }])
})();

