/**
 * Created by Toshiba on 10/31/2016.
 */
//helperSvc.js

(function () {
    angular.module('helperModule').factory('helperSvc', function ($http, $q, $log) {

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

        return {
            requestHandler: requestHandler
        }
    });
})();