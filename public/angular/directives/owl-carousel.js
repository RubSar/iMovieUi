(function () {
    'use strict';
    angular.module('iMovieUi').directive('wrapOwlCarousel', function () {

        return {
            restrict: 'E',
            link: function (scope, element, attrs) {

                var options = scope.$eval($(element).attr('data-options'));

                $(element).owlCarousel(options);

            }

        };

    });
})();
