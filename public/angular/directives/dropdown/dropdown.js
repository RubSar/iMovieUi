//dropdown.js
(function () {
    angular.module('iMovieUi').directive('mcDropdown', function () {
        return {
            scope: {
                onChange: '&',
                itemsList: '=',
                term: '@',
                label: '@',
                key: '@'
            },
            link: function (scope, element, attrs) {

                scope.$watch('itemsList', function (newVal, oldVal) {
                    if (newVal && newVal.length) {
                        scope.itemIsArray = Array.isArray(scope.itemsList[0][scope.term]);
                    }
                }, true);


                scope.setModel = function (label) {
                    if (scope.itemIsArray) {
                        label =label[0];
                    }
                    scope.onChange({param: {term: scope.key, value: label}});
                };
            },
            templateUrl: '/angular/directives/dropdown/dropdown.html'
        }
    })
})();
