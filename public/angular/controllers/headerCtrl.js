/**
 * Created by Ruben on 11/8/2016.
 */

(function () {
    angular.module('iMovieUi').controller('headerCtrl', ['$scope', '$auth', function ($scope, $auth) {

        $scope.authenticate = function (provider) {
            $scope.showModal = false;
            $auth.authenticate(provider);
        };
        $scope.isAuthenticated = function () {
            return $auth.isAuthenticated();
        };

        $scope.showModal = false;

        $scope.$on('trigger-modal', function (event) {
            $scope.showModal = !$scope.showModal;
        });

    }])
})();
