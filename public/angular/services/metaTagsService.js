/**
 * Created by Ruben on 8/24/2017.
 */


(function () {
    angular.module('iMovieUi').factory('MetaTagsService', ['MetaTags', function (MetaTags) {


        var metaTags = {
            title: MetaTags.HOME.TITLE,
            description: MetaTags.HOME.DESCRIPTION,
            keywords: MetaTags.HOME.KEYWORDS,
            image: MetaTags.HOME.IMAGE,
            url: MetaTags.HOME.URL
        };

        function setHomeMetaTags() {
            metaTags.title = MetaTags.HOME.TITLE;
            metaTags.description = MetaTags.HOME.DESCRIPTION;
            metaTags.keywords = MetaTags.HOME.KEYWORDS;
            metaTags.image = MetaTags.HOME.IMAGE;
            metaTags.url = MetaTags.HOME.URL;
        }

        function setCharacterMetaTags(model) {
            metaTags.title = model.name + ' by ' + model.actor;
            metaTags.description = model.name + ' was portrayed by ' + model.actor + ' in ' + model.movie + ' (' + model.year + ')';
            metaTags.keywords = model.name + ', ' + model.actor + ', ' + model.movie;
            metaTags.image = model.image;
            metaTags.url =model.url;
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

        function ogImage() {
            return metaTags.image;
        }

        function ogUrl() {
            return metaTags.url;
        }


        return {
            setHomeMetaTags: setHomeMetaTags,
            setCharacterMetaTags: setCharacterMetaTags,
            //getting data
            title: title,
            description: description,
            keywords: keywords,
            ogImage: ogImage,
            ogUrl: ogUrl

        }
    }]);
})();