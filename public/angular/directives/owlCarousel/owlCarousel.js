/**
 * Created by Ruben on 4/3/2017.
 */
(function(){
    angular.module('iMovieUi').directive("owlCarousel", function () {
        return {
            restrict: 'E',
            transclude: false,
            link: function (scope) {
                scope.initCarousel = function (element) {
                    var defaultOptions = {
                        loop: true,
                        margin: 15,
                        responsive: {
                            0: {
                                items: 1
                            },
                            500: {
                                items: 2
                            },
                            650: {
                                items: 3
                            },
                            850: {
                                items: 4
                            },
                            1024: {
                                items: 4
                            },
                            1270: {
                                items: 4
                            }
                        },
                        navText: [,],
                        nav: true,
                        dots: false,
                        navContainerClass: 'owl-buttons'
                    };

                    $(element).owlCarousel(defaultOptions);
                };
            }
        };
    });
})();