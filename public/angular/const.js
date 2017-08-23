/**
 * Created by Ruben on 8/23/2017.
 */
/**
 * Created by User on 11/8/2016.
 */


//const.js

(function () {
    angular.module('iMovieUi').factory('Constant',[ function () {
       return{
            HOME:{
                TITLE:'Rate for the Most Popular Movie and TV-Series Characters',
                DESCRIPTION:'Rate for popular movie and TV-Series characters, find your favorite characters. Vote for the best comic character actor',
                KEYWORDS:'movie characters, tv-series-characters, top characters, most played comic characters'
            },
            COMIC_CHARACTER:{
                TITLE:'Vote for the best [name] actor',
                DESCRIPTION:'Choose from [number] actors who created the best character of [name]',
                KEYWORDS:'[name], best actor of [name], [actors], [type]'
            },
           CHARACTER:{
               TITLE:'[name] by [actor]',
               DESCRIPTION:'[name] was portrayed by [actor] in [movie] ([year]). Rate average : [average], Rates count: [count] the best character of [name]',
               KEYWORDS:'[name], best actor of [name], [actors], [type]'
           }
       }

    }])
})();

