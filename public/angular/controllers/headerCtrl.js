/**
 * Created by Ruben on 11/8/2016.
 */

(function () {
    angular.module('iMovieUi').controller('headerCtrl', ['$scope', '$auth', '$rootScope', function ($scope, $auth, $rootScope) {

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
                var term = encodeURI($scope.searchTerm);
                if (window.location.href.includes('most-popular-movie-characters')) {
                    $rootScope.$broadcast('new-search', {term: term});
                } else {
                    window.location.href = '/most-popular-movie-characters?term=' + term;
                }

            } else {
                return;
            }

        }

    }])
})();
