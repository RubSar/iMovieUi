/**
 * Created by User on 11/8/2016.
 */

//headerCtrl.js
(function () {
    angular.module('iMovieUi').controller('headerCtrl', function ($scope, $auth) {

        $scope.authenticate = function(provider) {
            $scope.showModal = false;
            $auth.authenticate(provider);
        };
        $scope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };

        $scope.showModal = false;

        $scope.$on('trigger-modal', function(event) {
            $scope.showModal = !$scope.showModal;
        });


    })
})();
