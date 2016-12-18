/**
 * Created by User on 11/17/2016.
 */

(function () {
    "use strict";


    angular.module('iMovieUi').directive('paging', function () {

        var regex = /\{page\}/g;

        return {

            // Restrict to elements and attributes
            restrict: 'EA',

            // Assign the angular link function
            link: fieldLink,

            // Assign the angular directive template HTML
            template: fieldTemplate,

            // Assign the angular scope attribute formatting
            scope: {
                page: '=',
                pageSize: '=',
                total: '=',
                disabled: '@',
                dots: '@',
                ulClass: '@',
                activeClass: '@',
                disabledClass: '@',
                adjacent: '@',
                pagingAction: '&',
                pgHref: '@',
                textFirst: '@',
                textLast: '@',
                textNext: '@',
                textPrev: '@',
                textFirstClass: '@',
                textLastClass: '@',
                textNextClass: '@',
                textPrevClass: '@',
                textTitlePage: '@',
                textTitleFirst: '@',
                textTitleLast: '@',
                textTitleNext: '@',
                textTitlePrev: '@'
            }

        };

        function fieldLink(scope, el, attrs) {

            // Hook in our watched items
            scope.$watchCollection('[page,pageSize,total,disabled]', function () {
                build(scope, attrs);
            });
        }

        function fieldTemplate(el, attrs){
            return '<ul data-ng-hide="Hide" data-ng-class="ulClass"> ' +
                '<li ' +
                'title="{{Item.title}}" ' +
                'data-ng-class="Item.liClass" ' +
                'data-ng-repeat="Item in List"> ' +
                '<a ' +
                (attrs.pgHref ? 'data-ng-href="{{Item.pgHref}}" ' : 'href ') +
                'data-ng-class="Item.aClass" ' +
                'data-ng-click="Item.action()" ' +
                'data-ng-bind="Item.value">'+
                '</a> ' +
                '</li>' +
                '</ul>'
        }

        function setScopeValues(scope, attrs) {

            scope.List = [];
            scope.Hide = false;

            scope.page = parseInt(scope.page) || 1;
            scope.total = parseInt(scope.total) || 0;
            scope.adjacent = parseInt(scope.adjacent) || 2;

            scope.pgHref = scope.pgHref || '';
            scope.dots = scope.dots || '...';

            scope.ulClass = scope.ulClass || 'pagination';
            scope.activeClass = scope.activeClass || 'active';
            scope.disabledClass = scope.disabledClass || 'disabled';

            scope.textFirst = scope.textFirst || '<<';
            scope.textLast = scope.textLast || '>>';
            scope.textNext = scope.textNext || '>';
            scope.textPrev = scope.textPrev || '<';

            scope.textFirstClass = scope.textFirstClass || '';
            scope.textLastClass= scope.textLastClass || '';
            scope.textNextClass = scope.textNextClass || '';
            scope.textPrevClass = scope.textPrevClass || '';

            scope.textTitlePage = scope.textTitlePage || 'Page {page}';
            scope.textTitleFirst = scope.textTitleFirst || 'First Page';
            scope.textTitleLast = scope.textTitleLast || 'Last Page';
            scope.textTitleNext = scope.textTitleNext || 'Next Page';
            scope.textTitlePrev = scope.textTitlePrev || 'Previous Page';

            scope.hideIfEmpty = evalBoolAttribute(scope, attrs.hideIfEmpty);
            scope.showPrevNext = evalBoolAttribute(scope, attrs.showPrevNext);
            scope.showFirstLast = evalBoolAttribute(scope, attrs.showFirstLast);
            scope.scrollTop = evalBoolAttribute(scope, attrs.scrollTop);
            scope.isDisabled = evalBoolAttribute(scope, attrs.disabled);
        }


        function evalBoolAttribute(scope, value){
            return angular.isDefined(value)
                ? !!scope.$parent.$eval(value)
                : false;
        }

        function validateScopeValues(scope, pageCount) {

            // Block where the page is larger than the pageCount
            if (scope.page > pageCount) {
                scope.page = pageCount;
            }

            // Block where the page is less than 0
            if (scope.page <= 0) {
                scope.page = 1;
            }

            // Block where adjacent value is 0 or below
            if (scope.adjacent <= 0) {
                scope.adjacent = 2;
            }

            // Hide from page if we have 1 or less pages
            // if directed to hide empty
            if (pageCount <= 1) {
                scope.Hide = scope.hideIfEmpty;
            }
        }


        function internalAction(scope, page) {

            // Block clicks we try to load the active page
            if (scope.page == page) {
                return;
            }

            // Block if we are forcing disabled
            if(scope.isDisabled)
            {
                return;
            }

            // Update the page in scope
            scope.page = page;

            // Pass our parameters to the paging action
            scope.pagingAction({
                page: scope.page,
                pageSize: scope.pageSize,
                total: scope.total
            });

            // If allowed scroll up to the top of the page
            if (scope.scrollTop) {
                scrollTo(0, 0);
            }
        }


        function addPrevNext(scope, pageCount, mode) {

            // Ignore if we are not showing
            // or there are no pages to display
            if ((!scope.showPrevNext && !scope.showFirstLast) || pageCount < 1) {
                return;
            }

            // Local variables to help determine logic
            var disabled, alpha, beta;

            // Determine logic based on the mode of interest
            // Calculate the previous / next page and if the click actions are allowed
            if (mode === 'prev') {

                disabled = scope.page - 1 <= 0;
                var prevPage = scope.page - 1 <= 0 ? 1 : scope.page - 1;

                if(scope.showFirstLast){
                    alpha = {
                        value: scope.textFirst,
                        title: scope.textTitleFirst,
                        aClass: scope.textFirstClass,
                        page: 1
                    };
                }

                if(scope.showPrevNext){
                    beta = {
                        value: scope.textPrev,
                        title: scope.textTitlePrev,
                        aClass: scope.textPrevClass,
                        page: prevPage
                    };
                }

            } else {

                disabled = scope.page + 1 > pageCount;
                var nextPage = scope.page + 1 >= pageCount ? pageCount : scope.page + 1;

                if(scope.showPrevNext){
                    alpha = {
                        value: scope.textNext,
                        title: scope.textTitleNext,
                        aClass: scope.textNextClass,
                        page: nextPage
                    };
                }

                if(scope.showFirstLast){
                    beta = {
                        value: scope.textLast,
                        title: scope.textTitleLast,
                        aClass: scope.textLastClass,
                        page: pageCount
                    };
                }

            }

            // Create the Add Item Function
            var buildItem = function (item, disabled) {
                return {
                    title: item.title,
                    aClass: item.aClass,
                    value: item.aClass ? '' : item.value,
                    liClass: disabled ? scope.disabledClass : '',
                    pgHref: disabled ? '' : scope.pgHref.replace(regex, item.page),
                    action: function () {
                        if (!disabled) {
                            internalAction(scope, item.page);
                        }
                    }
                };
            };

            // Force disabled if specified
            if(scope.isDisabled){
                disabled = true;
            }

            // Add alpha items
            if(alpha){
                var alphaItem = buildItem(alpha, disabled);
                scope.List.push(alphaItem);
            }

            // Add beta items
            if(beta){
                var betaItem = buildItem(beta, disabled);
                scope.List.push(betaItem);
            }
        }

        function addRange(start, finish, scope) {

            // Add our items where i is the page number
            var i = 0;
            for (i = start; i <= finish; i++) {

                var pgHref = scope.pgHref.replace(regex, i);
                var liClass = scope.page == i ? scope.activeClass : '';

                // Handle items that are affected by disabled
                if(scope.isDisabled){
                    pgHref = '';
                    liClass = scope.disabledClass;
                }


                scope.List.push({
                    value: i,
                    title: scope.textTitlePage.replace(regex, i),
                    liClass: liClass,
                    pgHref: pgHref,
                    action: function () {
                        internalAction(scope, this.value);
                    }
                });
            }
        }

        function addDots(scope) {
            scope.List.push({
                value: scope.dots,
                liClass: scope.disabledClass
            });
        }

        function addFirst(scope, next) {

            addRange(1, 2, scope);

            // We ignore dots if the next value is 3
            // ie: 1 2 [...] 3 4 5 becomes just 1 2 3 4 5
            if (next != 3) {
                addDots(scope);
            }
        }

        // Add Last Pages
        function addLast(pageCount, scope, prev) {

            // We ignore dots if the previous value is one less that our start range
            // ie: 1 2 3 4 [...] 5 6  becomes just 1 2 3 4 5 6
            if (prev != pageCount - 2) {
                addDots(scope);
            }

            addRange(pageCount - 1, pageCount, scope);
        }



        function build(scope, attrs) {

            // Block divide by 0 and empty page size
            if (!scope.pageSize || scope.pageSize <= 0) {
                scope.pageSize = 1;
            }

            // Determine the last page or total page count
            var pageCount = Math.ceil(scope.total / scope.pageSize);

            // Set the default scope values where needed
            setScopeValues(scope, attrs);

            // Validate the scope values to protect against strange states
            validateScopeValues(scope, pageCount);

            // Create the beginning and end page values
            var start, finish;

            // Calculate the full adjacency value
            var fullAdjacentSize = (scope.adjacent * 2) + 2;


            // Add the Next and Previous buttons to our list
            addPrevNext(scope, pageCount, 'prev');

            // If the page count is less than the full adjacnet size
            // Then we simply display all the pages, Otherwise we calculate the proper paging display
            if (pageCount <= (fullAdjacentSize + 2)) {

                start = 1;
                addRange(start, pageCount, scope);

            } else {

                // Determine if we are showing the beginning of the paging list
                // We know it is the beginning if the page - adjacent is <= 2
                if (scope.page - scope.adjacent <= 2) {

                    start = 1;
                    finish = 1 + fullAdjacentSize;

                    addRange(start, finish, scope);
                    addLast(pageCount, scope, finish);
                }

                // Determine if we are showing the middle of the paging list
                // We know we are either in the middle or at the end since the beginning is ruled out above
                // So we simply check if we are not at the end
                // Again 2 is hard coded as we always display two pages after the dots
                else if (scope.page < pageCount - (scope.adjacent + 2)) {

                    start = scope.page - scope.adjacent;
                    finish = scope.page + scope.adjacent;

                    addFirst(scope, start);
                    addRange(start, finish, scope);
                    addLast(pageCount, scope, finish);
                }

                // If nothing else we conclude we are at the end of the paging list
                // We know this since we have already ruled out the beginning and middle above
                else {

                    start = pageCount - fullAdjacentSize;
                    finish = pageCount;

                    addFirst(scope, start);
                    addRange(start, finish, scope);
                }
            }

            // Add the next and last buttons to our paging list
            addPrevNext(scope, pageCount, 'next');
        }

    });

})();