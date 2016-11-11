
//dropdown.js
(function(){
    angular.module('iMovieUi').directive('mcDropdown', function(){
        return{
            scope: {
                model: '=',
                itemsList: '=',
                term:'@',
                label:'@'
            },
            link: function (scope, element, attrs) {

                scope.searchResult = angular.copy(scope.itemsList);
                scope.$watch('list', function () {
                    scope.searchResult = angular.copy(scope.itemsList);
                }, true);
                //set model
                scope.setModel = function (label) {
                    var _selectedItem = $.grep(scope.itemsList, function (item) {
                        return item[scope.term] == label;
                    })[0];
                    scope.model = angular.copy(_selectedItem);
                };
            },
            templateUrl: '/angular/directives/dropdown/dropdown.html'
        }
    })
})();
