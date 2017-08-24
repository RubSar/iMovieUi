/**
 * Created by Ruben on 8/24/2017.
 */


(function () {
    angular.module('iMovieUi').factory('MetaTagsService', ['MetaTags', function (MetaTags) {


        var metaTags = {
            title: MetaTags.HOME.TITLE,
            description: MetaTags.HOME.DESCRIPTION,
            keywords: MetaTags.HOME.KEYWORDS
        };

        function setHomeMetaTags() {
            metaTags.title = MetaTags.HOME.TITLE;
            metaTags.description = MetaTags.HOME.DESCRIPTION;
            metaTags.keywords = MetaTags.HOME.KEYWORDS;
        }


        //getting data
        function title() {
            return metaTags.title;
        }

        function description() {
            return metaTags.description;
        }

        function keywords() {
            return metaTags.keywords;
        }


        return {
            setHomeMetaTags: setHomeMetaTags,
            //getting data
            title: title,
            description: description,
            keywords: keywords

        }
    }]);
})();