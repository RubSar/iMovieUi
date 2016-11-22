
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

              scope.$watch('itemsList', function(newVal, oldVal){
                  if (newVal && newVal.length) {
                      scope.itemIsArray = Array.isArray(scope.itemsList[0][scope.term]);
                  }
              },true);
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
