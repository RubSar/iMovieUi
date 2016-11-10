/**
 * Created by User on 11/8/2016.
 */

(function () {
    angular.module('iMovieUiApp').controller('headerCtrl', function ($scope, mpmcSvc, $auth) {

        $scope.authenticate = function(provider) {
            $auth.authenticate(provider);
        };

        $scope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };

    })
})();
