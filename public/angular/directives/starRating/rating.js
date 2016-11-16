/**
 * Created by Toshiba on 11/13/2016.
 */

(function () {
    'use strict';

    angular.module('iMovieUi').directive('starRating', function ($auth, $rootScope) {
        return {
            restrict: 'E',
            scope: {
                ratingValue: '=',
                max: '=',
                userRate: '=',
                onRatingSelected: '&'
            },
            link: function (scope, elem, attrs) {
                scope.max = scope.max || 10;
                scope.ratingValue = scope.ratingValue || 1;

                scope.isAuthenticated = function () {
                    return $auth.isAuthenticated();
                };

                scope.triggerModal = function(){
                    $rootScope.$broadcast('trigger-modal');
                };

                var updateStars = function () {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };



                scope.toggle = function (index) {
                    scope.rateMode = false;
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating: index + 1
                    });
                };

                scope.$watch('ratingValue',
                    function (oldVal, newVal) {
                        if (newVal) {
                            updateStars();
                        }
                    }
                );
            },
            templateUrl: '/angular/directives/starRating/rating.html'
        }
    });

})();