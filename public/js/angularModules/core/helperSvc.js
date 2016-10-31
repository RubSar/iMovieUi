/**
 * Created by Toshiba on 10/31/2016.
 */
//helperSvc.js

(function(){
    angular.module('helperModule').factory('helperSvc', function($http, $q, $log){

        function requestHandler(requestBody){
            var deferred = $q.defer();
            $http.(requestBody)
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function(msg, code) {
                    deferred.reject(msg);
                     $log.error(msg, code);
                 });

           return deferred.promise;
        }

        return{
            requestHandler:requestHandler
        }
    });
})();