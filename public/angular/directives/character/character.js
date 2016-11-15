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


                scope.avgUpdate =false;
                function sum(items, prop) {
                    return items.reduce(function (a, b) {
                        return a + b[prop];
                    }, 0);
                }

                scope.rateAverage = !!scope.model.rates.length ? sum(scope.model.rates, 'value') / scope.model.rates.length : 0;

                scope.$watch('model.rates', function (newVal, oldVal) {
                    scope.rateAverage = !!scope.model.rates.length ? sum(scope.model.rates, 'value') / scope.model.rates.length : 0;

                }, true);


                scope.rateFunction = function (value) {
                    var dto = {
                        value: value,
                        characterId: scope.model._id
                    };


                    RateSvc.rate(dto)
                        .then(function (response) {
                            if (response.success) {
                                scope.avgUpdate =true;
                                RateSvc.getRates(scope.model._id)
                                    .then(function (response) {
                                        scope.model.rates = response.data;
                                        scope.avgUpdate=false;
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