/**
 * Created by User on 11/2/2016.
 */

//autocomplete.js

(function(){
    angular.module('uiModule').directive('angularDropdown', function(){
        return{
            scope: {
                model: '=',
                itemsList: '=',
                term:'@',
                label:'@'
            },
            link: function (scope, element, attrs) {

                var $element = $(element);
                var $parent = $element.parent();
                var $input = $element.find('input:text');
                scope.currentIndex = -1;

                //disable closing drop down in click
                $input.bind('click', function (ev) {
                    ev.stopPropagation();
                });
                scope.searchResult = angular.copy(scope.itemsList);
                scope.$watch('list', function () {
                    scope.searchResult = angular.copy(scope.itemsList);
                }, true);

                //make search
                //scope.makeSearch = function () {
                //    scope.currentIndex = -1;
                //    scope.searchResult = $.grep(scope.itemsList, function (item) {
                //        return item[scope.term].toLowerCase().indexOf(scope.searchTerm.toLowerCase()) > -1;
                //    });
                //
                //};

                //set model
                scope.setModel = function (label) {
                    var _selectedItem = $.grep(scope.itemsList, function (item) {
                        return item[scope.term] == label;
                    })[0];
                    scope.model = angular.copy(_selectedItem);
                };

                //scope.keyPressed = function (ev) {
                //    if (ev.which == 40) {
                //        scope.currentIndex = scope.searchResult.length - 1 > scope.currentIndex ? scope.currentIndex + 1 : scope.searchResult.length - 1;
                //    } else if (ev.which == 38) {
                //        scope.currentIndex = scope.currentIndex == 0 ? 0 : scope.currentIndex - 1;
                //    } else if (ev.which == 13) {
                //        if (scope.currentIndex < 0) return;
                //        scope.model = scope.searchResult[scope.currentIndex];
                //        scope.currentIndex = -1;
                //        $parent.parent().removeClass('open');
                //    }
                //};
            },
            templateUrl: '/js/angularModules/ui/autocomplete/autocomplete.html'
        }
    })
})();