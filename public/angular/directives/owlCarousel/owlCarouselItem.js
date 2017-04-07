/**
 * Created by Ruben on 4/3/2017.
 */
(function(){
    angular.module('iMovieUi').directive('owlCarouselItem', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            transclude: false,
            link: function (scope, element) {
                // wait for the last item in the ng-repeat then call init
                if (scope.$last) {
                    $timeout(function () {
                        scope.initCarousel(element.parent());
                    }, 500);

                }
            }
        };
    }]);
})();