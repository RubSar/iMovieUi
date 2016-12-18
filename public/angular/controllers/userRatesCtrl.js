/**
 * Created by Ruben on 11/22/2016.
 */

//userRatesCtrl.js
(function () {
    'use strict';

    angular.module('iMovieUi').controller('UserRatesCtrl', ['$scope', 'UserSvc','RateSvc', 'helperSvc','$auth', function ($scope, UserSvc,RateSvc, helperSvc, $auth) {

        $scope.contentLoaded = false;

        if ($auth.isAuthenticated()) {
            UserSvc.ratings()
                .then(function(response) {
                    $scope.topRatings = response.data;

                    $scope.curentRate =response.data[0];
                    $scope.activeTab =$scope.curentRate._id;
                    UserSvc.userRates({value: $scope.curentRate._id})
                        .then(function (response) {
                            $scope.rateValue =response.data.value;
                            $scope.characters = helperSvc.chunk(response.data.characters, 4);
                            $scope.contentLoaded = true;
                        }, function (err) {
                            console.log(err);
                        })

                }, function(err){
                    console.log(err);
                });
        }else{
            window.location='/'
        }

        $scope.getRates = function (index) {
            $scope.activeTab =index;
            $scope.contentLoaded = false;
            UserSvc.userRates({value: index})
                .then(function (response) {
                    $scope.rateValue =response.data.value;
                    $scope.characters = helperSvc.chunk(response.data.characters, 4);
                    $scope.contentLoaded = true;
                }, function (err) {
                    console.log(err);
                })
        };

        $scope.rateFunction = function (value, characterId) {
            if (value == $scope.rateValue) {
                return ;
            }else{
                var dto = {
                    value: value,
                    characterId: characterId
                };

                RateSvc.rate(dto)
                    .then(function (response) {
                        if (response.success) {
                            console.log(response.value);
                        }
                    }, function (err) {
                        console.log(err);
                    })
            }
        };

        $scope.isActiveTab = function(index){
            return $scope.activeTab ==index;
        }
    }]);
})();

