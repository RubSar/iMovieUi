/**
 * Created by Toshiba on 11/13/2016.
 */
(function () {
    'use strict';

    angular.module('iMovieUi').directive('character',['RateSvc', function (RateSvc) {
        return {
            restrict: 'E',
            scope: {
                model: '='
            },
            link: function (scope, element, attrs) {

                scope.rateValue = 1;
                scope.avgUpdate = false;

                scope.$watch('model.userRate', function (newVal, oldVal) {
                    if (newVal && newVal != oldVal) {
                        scope.rateValue = newVal;
                    }
                });

                scope.rateAverage = scope.model.ratesValue>0 ? scope.model.ratesValue/scope.model.ratesCount : 0;


                scope.rateFunction = function (value) {
                    var dto = {
                        value: value,
                        characterId: scope.model._id
                    };
                    scope.avgUpdate = true;
                    RateSvc.rate(dto)
                        .then(function (response) {
                            if (response.success) {

                                if (response.message == 'created') {
                                    scope.model.ratesCount+=1;
                                    scope.model.ratesValue+= response.value;
                                }else{
                                    scope.model.ratesValue+= response.dif;
                                }
                                scope.avgUpdate = false;
                                scope.rateAverage = scope.model.ratesValue>0 ? scope.model.ratesValue/scope.model.ratesCount : 0;
                            }
                        }, function (err) {
                            console.log(err);
                        })
                };
            },
            templateUrl: '/angular/directives/character/character.html'
        }
    }]);
})();