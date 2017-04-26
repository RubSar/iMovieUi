/**
 * Created by Ruben on 11/8/2016.
 */

(function () {
    angular.module('iMovieUi').controller('headerCtrl', ['$scope', '$state', '$auth', '$rootScope', function ($scope, $state, $auth, $rootScope) {

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

        $scope.logOut = function () {
            $auth.logout();
        };

        $scope.makeSearch = function () {
            if ($scope.searchTerm.length) {
                $state.go('search', {term: $scope.searchTerm})
            } else {
                return;
            }
        }

    }])
})();
