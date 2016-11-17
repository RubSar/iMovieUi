/**
 * Created by Toshiba on 11/13/2016.
 */
(function () {
    'use strict';

    angular.module('iMovieUi').directive('character', function (RateSvc) {
        return {
            restrict: 'E',
            scope: {
                model: '='
            },
            link: function (scope, element, attrs) {

                scope.rateValue = 1;
                scope.avgUpdate = false;
                function sum(items, prop) {
                    return items.reduce(function (a, b) {
                        return a + b[prop];
                    }, 0);
                }

                function average(sum, length) {
                    return (sum / length).toFixed(1);
                }

                scope.$watch('model.userRate', function (newVal, oldVal) {
                    if (newVal && newVal != oldVal) {
                        scope.rateValue = newVal;
                    }
                });

                scope.rateAverage = !!scope.model.rates.length ? average(sum(scope.model.rates, 'value'), scope.model.rates.length) : 0;

                scope.$watch('model.rates', function (newVal, oldVal) {
                    scope.rateAverage = !!scope.model.rates.length ? average(sum(scope.model.rates, 'value'), scope.model.rates.length) : 0;

                }, true);


                scope.rateFunction = function (value) {
                    var dto = {
                        value: value,
                        characterId: scope.model._id
                    };
                    RateSvc.rate(dto)
                        .then(function (response) {
                            if (response.success) {
                                scope.avgUpdate = true;
                                RateSvc.getRates(scope.model._id)
                                    .then(function (response) {
                                        scope.model.rates = response.data;
                                        scope.avgUpdate = false;
                                        scope.model.userRate = value;
                                    }, function (err) {
                                        console.log(err);
                                    })
                            }
                        }, function (err) {
                            console.log(err);
                        })
                };
            },
            templateUrl: '/angular/directives/character/character.html'
        }
    });
})();