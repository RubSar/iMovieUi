/**
 * Created by Ruben on 10/31/2016.
 */
//helperSvc.js

(function () {
    angular.module('iMovieUi').factory('helperSvc',['$http','$q', function ($http, $q) {

        function requestHandler(requestBody) {
            var task = $q.defer();
            $http(requestBody)
                .success(function (result, status, headers, config) {
                    task.resolve(result);
                })
                .error(function (result, status, headers, config) {
                    task.reject(status);
                });
            return task.promise;
        }
        function chunk(arr, size) {
            var newArr = [];
            for (var i=0; i<arr.length; i+=size) {
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        }



        return {
            requestHandler: requestHandler,
            chunk:chunk
        }
    }]);
})();