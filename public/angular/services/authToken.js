/**
 * Created by User on 11/8/2016.
 */


//authToken.js

(function () {
    angular.module('iMovieUi').factory('authToken',['$window', function ($window) {
        var storage = $window.localStorage;
        var cachedToken;
        var userToken = 'satellizer_token';
        var isAuthenticated = false;
        var authToken = {
            setToken: function(token) {
                cachedToken = token;
                storage.setItem(userToken, token);
                isAuthenticated = true;
            },
            getToken: function() {
                if (!cachedToken)
                    cachedToken = storage.getItem(userToken);

                return cachedToken;
            },
            isAuthenticated: function() {
                return !!authToken.getToken();
            },
            removeToken: function() {
                cachedToken = null;
                storage.removeItem(userToken);
                isAuthenticated = false;
            }
        };

        return authToken;

    }])
})();

