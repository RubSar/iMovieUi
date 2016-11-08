/**
 * Created by User on 11/8/2016.
 */


//authSvc.js

(function () {
    angular.module('iMovieUiApp').factory('authSvc', function (helperSvc) {

        function googleAuth(){
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/all'});
        }



        return {
            googleAuth:googleAuth

        }
    })
})();