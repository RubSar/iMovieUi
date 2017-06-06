/**
 * Created by Ruben on 6/6/2017.
 */
(function(){
    angular.module('iMovieUi').directive('fbComments', ['$timeout', function ($timeout) {


        function createHTML(href, numPosts, colorScheme, width) {
            return '<div class="fb-comments" ' +
                'data-href="' + href + '" ' +
                'data-numposts="' + numPosts + '" ' +
                'data-colorsheme="' + colorScheme + '" ' +
                'data-width="' + width + '">' +
                '</div>';
        }

        return {
            restrict: 'A',
            scope: {},
            link: function postLink(scope, elem, attrs) {
                //
                // Use timeout in order to be called after all watches are done and FB script is loaded
                //
                attrs.$observe('pageHref', function (newValue) {
                    var href = newValue;
                    var numPosts = attrs.numposts || 5;
                    var colorscheme = attrs.colorscheme || 'light';
                    var width = attrs.width || '100%';
                    elem.html(createHTML(href, numPosts, colorscheme, width));
                    $timeout(function () {
                        if (typeof FB != 'undefined') {
                            FB.XFBML.parse(elem[0]);
                        }
                    });
                });


            }
        };
    }]);
})();