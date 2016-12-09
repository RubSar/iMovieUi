/**
 * Created by Ruben on 11/22/2016.
 */

//userRatesCtrl.js
(function () {
    'use strict';

    angular.module('iMovieUi').controller('UserRatesCtrl', ['$scope', 'UserSvc', function ($scope, UserSvc) {

        $scope.contentLoaded = true;


        //for implementation active tab
        //http://jsfiddle.net/simonbingham/bFWUM/

        UserSvc.ratings()
            .then(function(response) {
                $scope.topRatings = response.data;

                $scope.curentRate =response.data[0];
                UserSvc.userRates({value: $scope.curentRate._id})
                    .then(function (response) {
                        $scope.curentRates = response.data;
                        $scope.contentLoaded = true;
                    }, function (err) {
                        console.log(err);
                    })

            }, function(err){
                console.log(err);
            });

        $scope.getRates = function (value) {
            $scope.contentLoaded = false;
            UserSvc.userRates({value: value})
                .then(function (response) {
                    $scope.curentRates = response.data;
                    $scope.contentLoaded = true;
                }, function (err) {
                    console.log(err);
                })
        };


    }]);
})();