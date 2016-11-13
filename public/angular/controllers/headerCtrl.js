/**
 * Created by User on 11/8/2016.
 */

//headerCtrl.js
(function () {
    angular.module('iMovieUi').controller('headerCtrl', function ($scope, $auth) {

        $scope.authenticate = function(provider) {
            $auth.authenticate(provider);
        };
        $scope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };

    })
})();
