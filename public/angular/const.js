/**
 * Created by Ruben on 8/23/2017.
 */
/**
 * Created by User on 11/8/2016.
 */


//const.js

(function () {
    angular.module('iMovieUi').constant('MetaTags', {
        HOME: {
            TITLE: 'Rate for the Most Popular Movie and TV-Series Characters',
            DESCRIPTION: 'Rate for popular movie and TV-Series characters, find your favorite characters. Vote for the best comic character actor',
            KEYWORDS: 'movie characters, tv-series-characters, top characters, most played comic characters',
            IMAGE:'http://imovieui.com/img/og-home.jpg',
            URL:'http://imovieui.com/'
        },
        CHARACTER: {
            TITLE: '[name] by [actor]',
            DESCRIPTION: '[name] was portrayed by [actor] in [movie] ([year]). Rate average : [average], Rates count: [count]',
            KEYWORDS: '[name], [actor], [movie]',
            IMAGE:'[image]',
            URL:'[url]'
        },
        COMIC_CHARACTER: {
            TITLE: 'Vote for the best [name] actor',
            DESCRIPTION: 'Choose from [number] actors who created the best character of [name]',
            KEYWORDS: '[name], best actor of [name], [actors], [type]'
        },
        CHARACTERS_LIST: {
            TITLE: 'Most popular movie characters',
            DESCRIPTION: 'Rate for the most popular movie characters. Find characters from your favorite movies. Find your favorite actors most popular movie characters',
            KEYWORDS: 'movie, characters, characters, top characters, greatest characters, movie'
        },
        CHARACTERS_LIST_SORTED: {
            TITLE: 'Top characters of [key]',
            DESCRIPTION: '[name] was portrayed by [actor] in [movie] ([year]). Rate average : [average], Rates count: [count]',
            KEYWORDS: '[name], [actor], [movie]'
        }

    });

})();

