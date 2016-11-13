/**
 * Created by Toshiba on 11/13/2016.
 */
(function () {
    'use strict';

    angular.module('iMovieUi').directive('character', function () {
        return{
            restrict: 'E',
            scope:{
                model: '='
            },
            link:function(scope, element, attrs){

            },
            templateUrl: '/angular/directives/character/character.html'
        }
    });
})();