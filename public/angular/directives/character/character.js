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
                scope.rateFunction = function (value) {
                    var dto = {
                        value: value,
                        characterId: scope.model._id
                    };
                    console.log(dto);
                    RateSvc.rate(dto)
                        .then(function (response) {
                            console.log(response);
                        }, function(err){
                            console.log(err);
                        })
                }
            },
            templateUrl: '/angular/directives/character/character.html'
        }
    });
})();