/**
 * Created by Ruben on 8/23/2017.
 */

(function () {
    angular.module('iMovieUi').directive('seoMetaTags', ['$state', '$stateParams', function ($state, $stateParams) {


        return {
            restrict: 'A',
            replace:true,
            link: function (scope, elem, attrs) {


            },
            template: '<meta property="og:url" content="http://imovieui.com"/>' +
            '<meta property="og:type" content="website"/>' +
            '<meta property="og:title" content="Rate for the top Movie and TV-Series characters."/>' +
            '<meta property="og:description" content="List of memorable tv-series characters. List of memorable movie characters. Vote for the best comic character actor."/>' +
            '<meta property="og:image" content="http://imovieui.com/img/og-home.jpg"/>'
        };
    }]);
})();