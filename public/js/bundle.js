/**
 * Created by Ruben on 11/11/2016.
 */
(function () {
    angular.module('iMovieUi', ['satellizer', 'ui.router'])
        .config(['$authProvider', '$httpProvider', '$stateProvider', '$locationProvider', '$urlRouterProvider', function ($authProvider, $httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
            $httpProvider.interceptors.push('authInterceptor');
            $authProvider.facebook({
                clientId: '175488799579769'
            });


            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: '/angular/controllers/home/home.html',
                    controller: 'HomeCtrl'
                })
                .state('userRates', {
                    url: '/myRates',
                    templateUrl: '/angular/controllers/userRates/user.rates.html',
                    controller: 'UserRatesCtrl'
                })
                .state('search', {
                    url: '/search?term',
                    templateUrl: '/angular/controllers/search/search.html',
                    controller: 'SearchCtrl'
                })
                .state('comicCharacter', {
                    url: '/comic-character/:name',
                    templateUrl: '/angular/controllers/comicCharacter/comic.character.html',
                    controller: 'ComicCharacterCtrl'
                })
                .state('character', {
                    url: '/character/:longName',
                    templateUrl: '/angular/controllers/character/character.html',
                    controller: 'CharacterCtrl'
                })
                .state('movieCharactersList', {
                    url: '/most-popular-movie-characters?page',
                    templateUrl: '/angular/controllers/movieCharactersList/movie.characters.list.html',
                    controller: 'MovieCharactersListCtrl'
                })
                .state('movieCharactersList.sorted', {
                    url: '/:key/:value',
                    templateUrl: '/angular/controllers/movieCharactersList/movie.characters.list.html',
                    controller: 'MovieCharactersListCtrl'
                })
                .state('tvSeriesCharactersList', {
                    url: '/most-popular-tv-series-characters?page',
                    templateUrl: '/angular/controllers/tvSeriesCharactersList/tv.series.characters.list.html',
                    controller: 'TvSeriesCharactersListCtrl'
                })
                .state('tvSeriesCharactersList.sorted', {
                    url: '/:key/:value',
                    templateUrl: '/angular/controllers/tvSeriesCharactersList/tv.series.characters.list.html',
                    controller: 'TvSeriesCharactersListCtrl'
                });


            $urlRouterProvider.otherwise('/');

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

        }]);

})();
/**
 * Created by User on 11/8/2016.
 */


//authToken.js

(function () {
    angular.module('iMovieUi').factory('authToken',['$window', function ($window) {
        var storage = $window.localStorage;
        var cachedToken;
        var userToken = 'satellizer_token';
        var isAuthenticated = false;
        var authToken = {
            setToken: function(token) {
                cachedToken = token;
                storage.setItem(userToken, token);
                isAuthenticated = true;
            },
            getToken: function() {
                if (!cachedToken)
                    cachedToken = storage.getItem(userToken);

                return cachedToken;
            },
            isAuthenticated: function() {
                return !!authToken.getToken();
            },
            removeToken: function() {
                cachedToken = null;
                storage.removeItem(userToken);
                isAuthenticated = false;
            }
        };

        return authToken;

    }])
})();


/**
 * Created by Ruben on 11/11/2016.
 */
(function () {
    angular.module('iMovieUi')
        .factory('authInterceptor',['authToken', function (authToken) {
            return {
                request: function (config) {
                    var token = authToken.getToken();
                    if (token)
                        config.headers.Authorization = 'Bearer ' + token;

                    return config;
                },
                response: function (response) {
                    return response;
                }
            };
        }])
})();


/**
 * Created by Ruben on 10/31/2016.
 */
//helperSvc.js

(function () {
    angular.module('iMovieUi').factory('helperSvc', ['$http', '$q', function ($http, $q) {

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
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i + size));
            }
            return newArr;
        }

        function decimalRound(number, decimals) {
            if (arguments.length == 1)
                return Math.round(number);

            var multiplier = Math.pow(10, decimals);
            return Math.round(number * multiplier) / multiplier;
        }

        function isDesktop(){
            return window.innerWidth>768;
        }


        return {
            requestHandler: requestHandler,
            chunk: chunk,
            decimalRound:decimalRound,
            isDesktop:isDesktop
        }
    }]);
})();
/**
 * Created by Ruben on 10/31/2016.
 */
//movieCharactersSvs.js

(function () {
    angular.module('iMovieUi').factory('MovieCharacterSvs', ['helperSvc', function (helperSvc) {


        function getTopCharacters() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/top'});
        }

        function getArtists() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/artists'});
        }

        function getMovies() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/movies'})
        }

        function getOrderedYears() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/years'});
        }

        function getCharactersList(model) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/list', params: model});
        }

        function getMovieCharacter(name) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/single', params: {name: name}});
        }

        function search(model) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/search', params: model});
        }

        function getRecommended(model) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/recommended', params: model});
        }

        return {
            getTopCharacters: getTopCharacters,
            getArtists: getArtists,
            getMovies: getMovies,
            getOrderedYears: getOrderedYears,
            getCharactersList: getCharactersList,
            getMovieCharacter: getMovieCharacter,
            getRecommended: getRecommended,
            search: search
        }
    }])
})();
/**
 * Created by Ruben on 10/31/2016.
 */
//movieCharactersSvs.js

(function () {
    angular.module('iMovieUi').factory('TvSeriesCharacterSvs', ['helperSvc', function (helperSvc) {


        function topCharacters() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/tvSeriesCharacter/top'});
        }

        function movies() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/tvSeriesCharacter/movies'})
        }

        function charactersList(model) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/tvSeriesCharacter/list', params: model});
        }

        function tvSeriesCharacter(name) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/tvSeriesCharacter/single', params: {name: name}});
        }

        function searchCharacters(model) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/tvSeriesCharacter/search', params: model});
        }

        function recommended(model) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/tvSeriesCharacter/recommended', params: model});
        }

        return {
            topCharacters: topCharacters,
            movies: movies,
            charactersList: charactersList,
            tvSeriesCharacter: tvSeriesCharacter,
            getRecommended: recommended,
            searchCharacters: searchCharacters
        }
    }])
})();
/**
 * Created by Ruben on 11/12/2016.
 */

(function () {
    'use strict';

    angular.module('iMovieUi').factory('ComicCharactersSvc', ['helperSvc', function (helperSvc) {

        function getAll() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/comicCharacters/all'});
        }

        function getSingle(name) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/comicCharacters/single', params: {name: name}});
        }

        function search(model) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/comicCharacters/search', params: model});
        }


        return {
            getAll: getAll,
            getSingle: getSingle,
            search: search
        }
    }]);
})();
/**
 * Created by Ruben on 11/14/2016.
 */

(function () {
    "use strict";

    angular.module('iMovieUi').factory('RateSvc',['helperSvc', function (helperSvc) {

        function rate(model) {
            return helperSvc.requestHandler({method: 'POST', url: '/api/rate/set', data:model});
        }
        function getRates(characterId){
            return helperSvc.requestHandler({method: 'GET', url: '/api/rate/rates', params:{characterId:characterId}});
        }
        function userRatesForCharacters(movies){
            return helperSvc.requestHandler({method: 'Post', url: '/api/rate/userRatesByCharacters', data:{movies:movies}});
        }

        function userRate(characterId){
            return helperSvc.requestHandler({method: 'GET', url: '/api/rate/userRate', params:{characterId:characterId}});
        }

        return {
            rate: rate,
            getRates:getRates,
            userRate:userRate,
            userRatesForCharacters:userRatesForCharacters
        };
    }])
})();
/**
 * Created by Ruben on 11/29/2016.
 */
(function () {
    "use strict";

    angular.module('iMovieUi').factory('VoteSvc',['helperSvc', function (helperSvc) {

        function vote(model) {
            return helperSvc.requestHandler({method: 'POST', url: '/api/vote/set', data:model});
        }
        function getUserVote(characterId){
            return helperSvc.requestHandler({method: 'GET', url: '/api/vote/user', params:{characterId:characterId}});
        }

        return {
            vote: vote,
            getUserVote:getUserVote

        };
    }])
})();
//userSvc.js

(function () {
    'use strict';

    angular.module('iMovieUi').factory('UserSvc',['helperSvc', function (helperSvc) {

        function userRates(model) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/user/rates', params: model});
        }

        function ratings() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/user/topRatings'});
        }

        return {
            userRates: userRates,
            ratings:ratings
        }
    }]);
})();
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

/**
 * Created by Toshiba on 11/13/2016.
 */

(function () {
    'use strict';

    angular.module('iMovieUi').directive('starRating',['$auth','$rootScope', function ($auth, $rootScope) {
        return {
            restrict: 'E',
            scope: {
                ratingValue: '=',
                max: '=',
                userRate: '=',
                onRatingSelected: '&'
            },
            link: function (scope, elem, attrs) {
                scope.max = scope.max || 10;
                scope.ratingValue = scope.ratingValue || 1;

                scope.isAuthenticated = function () {
                    return $auth.isAuthenticated();
                };

                scope.triggerModal = function(){
                    $rootScope.$broadcast('trigger-modal');
                };

                var updateStars = function () {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };



                scope.toggle = function (index) {
                    scope.rateMode = false;
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating: index + 1
                    });
                };

                scope.$watch('ratingValue',
                    function (oldVal, newVal) {
                        if (newVal) {
                            updateStars();
                        }
                    }
                );
            },
            templateUrl: '/angular/directives/starRating/rating.html'
        }
    }]);

})();
/**
 * Created by Ruben on 11/13/2016.
 */
(function () {
    'use strict';

    angular.module('iMovieUi').directive('character', ['RateSvc', 'helperSvc', function (RateSvc, helperSvc) {
        return {
            restrict: 'E',
            scope: {
                model: '='
            },
            link: function (scope, element, attrs) {

                scope.rateValue = 1;
                scope.avgUpdate = false;

                scope.$watch('model.userRate', function (newVal, oldVal) {
                    if (newVal && newVal != oldVal) {
                        scope.rateValue = newVal;
                    }
                });

                scope.imgTitle =scope.model.name + ' played by ' + scope.model.playedBy + ' in ' +scope.model.movies[0].name;

                scope.rateAverage = scope.model.ratesValue > 0
                    ? helperSvc.decimalRound(scope.model.ratesValue / scope.model.ratesCount, 1)
                    : 0;


                scope.rateFunction = function (value) {
                    var dto = {
                        value: value,
                        characterId: scope.model._id
                    };
                    scope.avgUpdate = true;
                    RateSvc.rate(dto)
                        .then(function (response) {
                            if (response.success) {

                                if (response.message == 'created') {
                                    scope.model.ratesCount += 1;
                                    scope.model.ratesValue += response.value;
                                } else {
                                    scope.model.ratesValue += response.dif;
                                }
                                scope.avgUpdate = false;
                                scope.rateAverage = scope.model.ratesValue > 0
                                    ? helperSvc.decimalRound(scope.model.ratesValue / scope.model.ratesCount, 1)
                                    : 0;
                            }
                        }, function (err) {
                            console.log(err);
                        })
                };
            },
            templateUrl: '/angular/directives/character/character.html'
        }
    }]);
})();
/**
 * Created by Ruben on 11/16/2016.
 */
(function () {
    "use strict";

    angular.module('iMovieUi').directive('modal', function () {

        return {
            template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '</div>',
            restrict: 'E',
            transclude: true,
            replace:true,
            scope:true,
            link: function postLink(scope, element, attrs) {
                scope.$watch(attrs.visible, function(value){
                    if(value == true)
                        $(element).modal('show');
                    else
                        $(element).modal('hide');
                });

                $(element).on('shown.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = false;
                    });
                });
            }
        };
    })
})();
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

        function fieldTemplate(el, attrs) {
            return '<ul data-ng-hide="Hide" data-ng-class="ulClass"> ' +
                '<li ' +
                'title="{{Item.title}}" ' +
                'data-ng-class="Item.liClass" ' +
                'data-ng-repeat="Item in List"> ' +
                '<a ' +
                (attrs.pgHref ? 'data-ng-href="{{Item.pgHref}}" ' : 'href ') +
                'data-ng-class="Item.aClass" ' +
                'data-ng-click="Item.action()" ' +
                'data-ng-bind="Item.value">' +
                '</a> ' +
                '</li>' +
                '</ul>'
        }

        function setScopeValues(scope, attrs) {

            scope.List = [];
            scope.Hide = false;
            var _adj = window.innerWidth < 529 ? 1 : 2;

            scope.page = parseInt(scope.page) || 1;
            scope.total = parseInt(scope.total) || 0;
            scope.adjacent = parseInt(scope.adjacent) || _adj;

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
            scope.textLastClass = scope.textLastClass || '';
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


        function evalBoolAttribute(scope, value) {
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
            if (scope.isDisabled) {
                return;
            }

            // Update the page in scope
            scope.page = page;

            // Pass our parameters to the paging action
            scope.pagingAction({params:{
                page: scope.page,
                pageSize: scope.pageSize,
                total: scope.total
            }});

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

                if (scope.showFirstLast) {
                    alpha = {
                        value: scope.textFirst,
                        title: scope.textTitleFirst,
                        aClass: scope.textFirstClass,
                        page: 1
                    };
                }

                if (scope.showPrevNext) {
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

                if (scope.showPrevNext) {
                    alpha = {
                        value: scope.textNext,
                        title: scope.textTitleNext,
                        aClass: scope.textNextClass,
                        page: nextPage
                    };
                }

                if (scope.showFirstLast) {
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
            if (scope.isDisabled) {
                disabled = true;
            }

            // Add alpha items
            if (alpha) {
                var alphaItem = buildItem(alpha, disabled);
                scope.List.push(alphaItem);
            }

            // Add beta items
            if (beta) {
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
                if (scope.isDisabled) {
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
/**
 * Created by Ruben on 4/3/2017.
 */
(function(){
    angular.module('iMovieUi').directive("owlCarousel", function () {
        return {
            restrict: 'E',
            transclude: false,
            link: function (scope) {
                scope.initCarousel = function (element) {
                    var defaultOptions = {
                        loop: true,
                        margin: 15,
                        responsive: {
                            0: {
                                items: 1
                            },
                            500: {
                                items: 2
                            },
                            650: {
                                items: 3
                            },
                            850: {
                                items: 4
                            },
                            1024: {
                                items: 4
                            },
                            1270: {
                                items: 4
                            }
                        },
                        navText: [,],
                        nav: true,
                        dots: false,
                        navContainerClass: 'owl-buttons'
                    };

                    $(element).owlCarousel(defaultOptions);
                };
            }
        };
    });
})();
/**
 * Created by Ruben on 4/3/2017.
 */
(function(){
    angular.module('iMovieUi').directive('owlCarouselItem', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            transclude: false,
            link: function (scope, element) {
                // wait for the last item in the ng-repeat then call init
                if (scope.$last) {
                    $timeout(function () {
                        scope.initCarousel(element.parent());
                    }, 500);

                }
            }
        };
    }]);
})();
/**
 * Created by Ruben on 6/6/2017.
 */
(function(){
    angular.module('iMovieUi').directive('fbComments', ['$timeout', function ($timeout) {


        function createHTML(href, numPosts, colorScheme, width) {
            return '<div class="fb-comments" ' +
                'data-href="' + href + '" ' +
                'data-numposts="' + numPosts + '" ' +
                'data-colorsheme="' + colorScheme + '" ' +
                'data-width="' + width + '">' +
                '</div>';
        }

        return {
            restrict: 'A',
            scope: {},
            link: function postLink(scope, elem, attrs) {
                //
                // Use timeout in order to be called after all watches are done and FB script is loaded
                //
                attrs.$observe('pageHref', function (newValue) {
                    var href = newValue;
                    var numPosts = attrs.numposts || 5;
                    var colorscheme = attrs.colorscheme || 'light';
                    var width = attrs.width || '100%';
                    elem.html(createHTML(href, numPosts, colorscheme, width));
                    $timeout(function () {
                        if (typeof FB != 'undefined') {
                            FB.XFBML.parse(elem[0]);
                        }
                    });
                });


            }
        };
    }]);
})();
/**
 * Created by Ruben on 11/8/2016.
 */

(function () {
    angular.module('iMovieUi').controller('headerCtrl', ['$scope', '$state', '$auth', '$rootScope', function ($scope, $state, $auth, $rootScope) {

        $scope.authenticate = function (provider) {
            $scope.showModal = false;
            $auth.authenticate(provider);
        };
        $scope.isAuthenticated = function () {
            return $auth.isAuthenticated();
        };

        $scope.showModal = false;

        $scope.$on('trigger-modal', function (event) {
            $scope.showModal = !$scope.showModal;
        });

        $scope.logOut = function () {
            $auth.logout();
        };

        $scope.makeSearch = function () {
            if ($scope.searchTerm.length) {
                $state.go('search', {term: $scope.searchTerm})
            } else {
                return;
            }
        }

    }])
})();

/**
 * Created by Ruben on 11/12/2016.
 */

(function () {
    'use strict';

    angular.module('iMovieUi').controller('HomeCtrl', ['$scope', '$timeout', '$window', 'MovieCharacterSvs', 'TvSeriesCharacterSvs', 'ComicCharactersSvc', 'helperSvc', 'RateSvc', '$auth',
        function ($scope, $timeout, $window, MovieCharacterSvs, TvSeriesCharacterSvs, ComicCharactersSvc, helperSvc, RateSvc, $auth) {
            //get movie characters
            $scope.comicCharactersLoaded = false;
            $scope.movieCharactersLoaded = false;
            $scope.tvSeriesCharactersLoaded = false;
            $scope.authState = false;
            $window.document.title ='iMovieUi: Most popular movie and tv-series characters';


            //getting top movie characters
            MovieCharacterSvs.getTopCharacters()
                .then(function (response) {
                    $scope.originalMovieCharacters = response.data;
                    $scope.movieCharactersLoaded = true;
                }, function (err) {
                    console.log(err);
                });

            //getting top tv-series characters
            TvSeriesCharacterSvs.topCharacters()
                .then(function (response) {
                    $scope.originalTvSeriesCharacters = response.data;
                    $scope.tvSeriesCharactersLoaded = true;
                }, function (err) {
                    console.log(err);
                });

            //getting comic characters
            ComicCharactersSvc.getAll()
                .then(function (response) {
                    $scope.comicCharacters = response.data;
                    $timeout(function () {
                        $scope.comicCharactersLoaded = true;
                    }, 400);
                }, function (err) {
                    console.log(err);
                });


            $scope.$watch('originalMovieCharacters', function (newVal, oldVal) {
                if (!!newVal) {
                    $scope.movieCharacters = helperSvc.chunk(newVal, 2);
                    getMovieCharactersUserRates();
                }
            }, true);
            $scope.$watch('originalTvSeriesCharacters', function (newVal, oldVal) {
                if (!!newVal) {
                    $scope.tvSeriesCharacters = helperSvc.chunk(newVal, 2);
                    getTvSeriesCharactersUserRates();
                }
            }, true);


            $scope.isAuthenticated = function () {
                return $auth.isAuthenticated();
            };


            $scope.$watch('authState', function (newVal, oldVal) {
                if (newVal) {
                    getMovieCharactersUserRates();
                    getTvSeriesCharactersUserRates();
                }
            }, true);


            //TODO: improve implementation letter
            function insertUserRatingForMC(userRates) {
                for (var i = 0; i < userRates.length; i++) {
                    for (var j = 0; j < $scope.originalMovieCharacters.length; j++) {
                        if (userRates[i].characterId == $scope.originalMovieCharacters[j]._id) {
                            $scope.originalMovieCharacters[j].userRate = userRates[i].value;
                        }
                    }
                }
            }

            function insertUserRatingForTSC(userRates) {
                for (var i = 0; i < userRates.length; i++) {
                    for (var j = 0; j < $scope.originalTvSeriesCharacters.length; j++) {
                        if (userRates[i].characterId == $scope.originalTvSeriesCharacters[j]._id) {
                            $scope.originalTvSeriesCharacters[j].userRate = userRates[i].value;
                        }
                    }
                }
            }

            //getting users rates for tv-series characters
            function getTvSeriesCharactersUserRates() {
                if (!!$scope.originalTvSeriesCharacters && $scope.authState) {
                    var movieCharacterIds = $scope.originalTvSeriesCharacters.map(function (a) {
                        return {_id: a._id};
                    });
                    RateSvc.userRatesForCharacters(movieCharacterIds)
                        .then(function (response) {
                            if (response.success) {
                                insertUserRatingForTSC(response.data);
                            }
                        }, function (err) {
                            console.log(err);
                        });
                }
            }

            //getting users rates for movie characters
            function getMovieCharactersUserRates() {
                if (!!$scope.originalMovieCharacters && $scope.authState) {
                    var movieCharacterIds = $scope.originalMovieCharacters.map(function (a) {
                        return {_id: a._id};
                    });
                    RateSvc.userRatesForCharacters(movieCharacterIds)
                        .then(function (response) {
                            if (response.success) {
                                insertUserRatingForMC(response.data);
                            }
                        }, function (err) {
                            console.log(err);
                        });
                }
            }


        }]);
})();
/**
 * Created by Ruben on 10/31/2016.
 */
//movieCharactersListCtrl.js

(function () {
    angular.module('iMovieUi').controller('SearchCtrl', ['$scope', '$sce', '$window', '$state', 'MovieCharacterSvs', 'ComicsCharactersSvc',
        function ($scope, $sce, $window, $state, MovieCharacterSvs, ComicsCharactersSvc) {

            $scope.movieCharactersContentLoaded = false;
            $scope.comicCharactersContentLoaded = false;
            $window.document.title = 'iMovieUi: Most Popular Movie and TV-Series Characters';
            $scope.model = $state.params.term;

            MovieCharacterSvs.search({term: $scope.model})
                .then(function (response) {
                    $scope.characters = response.data;
                    $scope.movieCharactersContentLoaded = true;
                }, function (err) {
                    console.log(err);
                });
            ComicsCharactersSvc.search({term: $scope.model})
                .then(function (response) {
                    $scope.comicCharacters = response.data;
                    $scope.comicCharactersContentLoaded = true;
                }, function (err) {
                    console.log(err);
                });
            $scope.highlight = function (text, search) {
                if (!search) {
                    return $sce.trustAsHtml(text);
                }
                return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="term">$&</span>'));
            };

            window.gl =$scope;

        }])
})();



/**
 * Created by Ruben on 10/31/2016.
 */
//movieCharactersListCtrl.js

(function () {
    angular.module('iMovieUi').controller('MovieCharactersListCtrl', ['$scope', '$rootScope', '$timeout', '$state', '$anchorScroll', '$sce', 'MovieCharacterSvs', 'RateSvc', 'helperSvc', '$auth', '$window',
        function ($scope, $rootScope, $timeout, $state, $anchorScroll, $sce, MovieCharacterSvs, RateSvc, helperSvc, $auth, $window) {

            $scope.contentLoaded = false;
            $scope.model = {
                page: $state.params.page || 1
            };
            if ($state.params.key && $state.params.value) {
                $scope.model.key = $state.params.key;
                $scope.model.value = $state.params.value;
                if ($state.params.key === 'playedBy') {
                    $scope.pageHeader = $sce.trustAsHtml('list of <strong>' + $state.params.value + '</strong> top movie characters');
                    $window.document.title = 'iMovieUi: List of ' + $state.params.value + ' top characters';
                } else if ($state.params.key === 'movies.year') {
                    $scope.pageHeader = $sce.trustAsHtml('Top movie characters of <strong>' + $state.params.value + '</strong>');
                    $window.document.title = 'iMovieUi: Top Movie Characters of ' + $state.params.value;
                } else if ($state.params.key === 'movies.name') {
                    $scope.pageHeader = $sce.trustAsHtml('List of <strong>' + $state.params.value + '</strong> top movie characters');
                    $window.document.title = 'iMovieUi: List of ' + $state.params.value + ' top Characters';
                }
            } else {

                $window.document.title = 'iMovieUi: Most Popular Movie Characters';
                $scope.pageHeader = $sce.trustAsHtml('most popular <strong>movie characters</strong>');

            }

            updateResults();


            $scope.isAuthenticated = function () {
                return $auth.isAuthenticated();
            };

            //getting top artists
            MovieCharacterSvs.getArtists()
                .then(function (response) {
                    $scope.artists = response.data;
                },
                function (err) {
                    console.log(err);
                });

            //getting top years
            MovieCharacterSvs.getOrderedYears()
                .then(function (response) {
                    $scope.years = response.data;
                }, function (err) {
                    console.log(err);
                });

            //getting top movies
            MovieCharacterSvs.getMovies()
                .then(function (response) {
                    $scope.movies = response.data;
                }, function (err) {
                    console.log(err);
                });

            //get all movie characters
            $scope.getAll = function () {
                $scope.pageHeader = $sce.trustAsHtml('most popular <strong>movie characters</strong>');
                $window.document.title = 'iMovieUi: Most Popular Movie Characters';
                $state.go('movieCharactersList', {
                    page: 1
                }, {notify: false});
                $scope.model = {
                    page: 1,
                    key: null,
                    value: null
                };
                updateResults();
            };


            $scope.pagingChange = function (params) {
                if (!!$state.params.key) {
                    $state.go('movieCharactersList.sorted', {
                        page: params.page
                    }, {notify: false});
                } else {
                    $state.go('movieCharactersList', {
                        page: params.page
                    }, {notify: false});
                }

                $timeout(function () {
                    updateResults();
                });
            };

            $scope.$watch('authState', function (newVal, oldVal) {
                if (newVal) {
                    getUserRates();
                }
            }, true);

            $scope.setModel = function (param) {

                if (param.term === 'playedBy') {
                    $scope.pageHeader = $sce.trustAsHtml('list of <strong>' + param.value + '</strong> top movie characters');
                    $window.document.title = 'iMovieUi: List of ' + param.value + ' top characters';
                } else if (param.term === 'movies.year') {
                    $scope.pageHeader = $sce.trustAsHtml('Top movie characters of <strong>' + param.value + '</strong>');
                    $window.document.title = 'iMovieUi: Top Movie Characters of ' + param.value;
                } else if (param.term === 'movies.name') {
                    $scope.pageHeader = $sce.trustAsHtml('List of <strong>' + param.value + '</strong> top characters');
                    $window.document.title = 'iMovieUi: List of ' + param.value + ' top characters';
                }
                $state.go('movieCharactersList.sorted', {
                    page: 1,
                    key: param.term,
                    value: param.value
                }, {notify: false});

                $scope.model = {
                    page: 1,
                    key: param.term,
                    value: param.value
                };

                updateResults();

            };

            $scope.$watch('originalMovieCharacters', function (newVal, oldVal) {
                if (!!newVal) {
                    getUserRates();
                }
            }, true);


            //TODO: improve implementation letter
            function insertUserRating(userRates) {
                for (var i = 0; i < userRates.length; i++) {
                    for (var j = 0; j < $scope.originalMovieCharacters.length; j++) {
                        if (userRates[i].characterId == $scope.originalMovieCharacters[j]._id) {
                            $scope.originalMovieCharacters[j].userRate = userRates[i].value;
                        }
                    }
                }
            }

            function getUserRates() {
                if (!!$scope.originalMovieCharacters && $scope.authState) {
                    var movieCharacterIds = $scope.originalMovieCharacters.map(function (a) {
                        return {_id: a._id};
                    });
                    RateSvc.userRatesForCharacters(movieCharacterIds)
                        .then(function (response) {
                            if (response.success) {
                                insertUserRating(response.data);
                            }
                        }, function (err) {
                            console.log(err);
                        });
                }
            }

            function updateResults() {
                $scope.contentLoaded = false;

                MovieCharacterSvs.getCharactersList($scope.model)
                    .then(function (response) {

                        $scope.originalMovieCharacters = response.data;
                        $scope.listCharacters = helperSvc.chunk(response.data, 2);
                        $scope.count = response.count;
                        $scope.contentLoaded = true;
                        $anchorScroll();

                    }, function (msg) {
                        console.log(msg);
                    });
            }

        }])
})();



//tvSeriesCharactersListCtrl.js

(function () {
    angular.module('iMovieUi').controller('TvSeriesCharactersListCtrl', ['$scope', '$rootScope', '$timeout', '$state','$anchorScroll', 'TvSeriesCharacterSvs', 'RateSvc', 'helperSvc', '$auth', '$window',
        function ($scope, $rootScope, $timeout, $state, $anchorScroll, TvSeriesCharacterSvs, RateSvc, helperSvc, $auth, $window) {

            $scope.contentLoaded = false;
            $window.document.title = 'iMovieUi: Most Popular TV-Series Characters';
            $scope.filteredBy = {};
            $scope.model = {
                page: $state.params.page || 1
            };
            if ($state.params.key && $state.params.value) {
                $scope.model.key = $state.params.key;
                $scope.model.value = $state.params.value;
                $window.document.title = 'iMovieUi: List of ' + $state.params.value + ' characters';
            }else{
                $window.document.title = 'iMovieUi: Most Popular TV-Series Characters';
            }

            updateResults();


            //only for input form
            $scope.searchTerm = $scope._searchTerm ? decodeURI($scope._searchTerm) : '';

            $scope.isAuthenticated = function () {
                return $auth.isAuthenticated();
            };

            //getting top movies
            TvSeriesCharacterSvs.movies()
                .then(function (response) {
                    $scope.movies = response.data;
                }, function (err) {
                    console.log(err);
                });


            //get all movie characters
            $scope.getAll = function () {
                $window.document.title = 'iMovieUi: Most Popular TV-Series Characters';

                $state.go('tvSeriesCharactersList', {
                    page: 1,
                    key: undefined,
                    value: undefined
                }, {notify: false});
                $scope.filteredBy = undefined;
                $scope._searchTerm = undefined;

                $scope.model = {
                    page: 1,
                    key: null,
                    value: null
                };
                updateResults();
            };


            $scope.pagingChange = function (params) {
                if (!!$state.params.key) {
                    $state.go('tvSeriesCharactersList.sorted', {
                        page: params.page
                    }, {notify: false});
                } else {
                    $state.go('tvSeriesCharactersList', {
                        page: params.page
                    }, {notify: false});
                }

                $timeout(function () {
                    updateResults();
                });
            };

            $scope.$watch('authState', function (newVal, oldVal) {
                if (newVal) {
                    getUserRates();
                }
            }, true);

            $scope.setModel = function (param) {
                $window.document.title = 'iMovieUi: List of ' +  param.value + ' characters';
                $state.go('tvSeriesCharactersList.sorted', {
                    page: 1,
                    key:param.term,
                    value:param.value
                }, {notify: false});
                param.page = 1;

                $scope.model = {
                    page: 1,
                    key: param.term,
                    value: param.value
                };

                updateResults();

            };

            $scope.$watch('originalCharacters', function (newVal, oldVal) {
                if (!!newVal) {
                    getUserRates();
                }
            }, true);


            //TODO: improve implementation letter
            function insertUserRating(userRates) {
                for (var i = 0; i < userRates.length; i++) {
                    for (var j = 0; j < $scope.originalCharacters.length; j++) {
                        if (userRates[i].characterId == $scope.originalCharacters[j]._id) {
                            $scope.originalCharacters[j].userRate = userRates[i].value;
                        }
                    }
                }
            }

            function getUserRates() {
                if (!!$scope.originalCharacters && $scope.authState) {
                    var movieCharacterIds = $scope.originalCharacters.map(function (a) {
                        return {_id: a._id};
                    });
                    RateSvc.userRatesForCharacters(movieCharacterIds)
                        .then(function (response) {
                            if (response.success) {
                                insertUserRating(response.data);
                            }
                        }, function (err) {
                            console.log(err);
                        });
                }
            }

            function updateResults() {
                $scope.contentLoaded = false;
                TvSeriesCharacterSvs.charactersList($scope.model)
                    .then(function (response) {
                        $scope.originalCharacters = response.data;
                        $scope.listCharacters = helperSvc.chunk(response.data, 2);
                        $scope.count = response.count;
                        $scope.contentLoaded = true;
                        $anchorScroll();
                    },
                    function (msg) {
                        console.log(msg);
                    });
            }

        }])
})();



/**
 * Created by Ruben on 11/17/2016.
 */

//characterCtrl.js
(function () {
    'use strict';

    angular.module('iMovieUi').controller('CharacterCtrl', ['$scope', '$window', '$location','$anchorScroll', '$state', 'MovieCharacterSvs', 'RateSvc', '$auth', 'helperSvc',
        function ($scope, $window, $location,$anchorScroll, $state, MovieCharacterSvs, RateSvc, $auth, helperSvc) {

            $window.document.title = $state.params.longName + ' (iMovieUi)';

            $scope.contentLoaded = false;
            $scope.notFound = false;
            $scope.avgUpdate = false;
            $scope.rateValue = 1;

            $scope.isDesktop = helperSvc.isDesktop();


            $scope.dataHref = function () {
                var url = $location.absUrl();
                return url.replace('localhost:3000', 'imovieui.com');
            };

            $scope.isAuthenticated = function () {
                return $auth.isAuthenticated();
            };

            $scope.$watch('authState', function (newVal, oldVal) {
                if (!!$scope.character && newVal && !$scope.userRate) {
                    RateSvc.userRate($scope.character._id)
                        .then(function (response) {
                            $scope.userRate = response.data.value;
                        }, function (err) {
                            console.log(err);
                        });
                }
            });


            MovieCharacterSvs.getMovieCharacter($state.params.longName)
                .then(function (response) {
                    if (response.success) {
                        $scope.contentLoaded = true;
                        $scope.character = response.character;
                        $scope.userRate = response.userRate;
                        $anchorScroll();
                        $scope.rateAverage = $scope.character.ratesValue > 0
                            ? helperSvc.decimalRound($scope.character.ratesValue / $scope.character.ratesCount, 1)
                            : 0;

                        $scope.fullName = $scope.character.name + ' played by ' + $scope.character.playedBy + ' in ' + $scope.character.movies[0].name;

                        if ($scope.isDesktop) {
                            var dto = {
                                movie: response.character.movies[0].name,
                                artist: response.character.playedBy,
                                year: response.character.movies[0].year
                            };
                            MovieCharacterSvs.getRecommended(dto)
                                .then(function (result) {
                                    $scope.recommended = result.data;
                                }, function (err) {
                                    console.log(err);
                                });
                        }
                    } else {
                        $scope.notFound = true;
                        $scope.message = response.message;
                    }

                }, function (err) {
                    console.log(err);
                });

            $scope.rateFunction = function (value) {
                var dto = {
                    value: value,
                    characterId: $scope.character._id
                };
                $scope.avgUpdate = true;
                RateSvc.rate(dto)
                    .then(function (response) {
                        if (response.success) {
                            if (response.message == 'created') {
                                $scope.character.ratesCount += 1;
                                $scope.character.ratesValue += response.value;
                                $scope.userRate = response.value;
                            }
                            else {
                                $scope.character.ratesValue += response.dif;
                                $scope.userRate += response.dif;
                            }

                            $scope.avgUpdate = false;
                            $scope.rateAverage = $scope.character.ratesValue > 0 ? $scope.character.ratesValue / $scope.character.ratesCount : 0;
                        }
                    }, function (err) {
                        console.log(err);
                    })
            };

            $scope.shareOnFacebook = function () {
                var caption = ($auth.isAuthenticated() && !!$scope.userRate) ? 'My rating ' + $scope.userRate + ', ' : '';
                var description = $scope.character.name + ' is a character from ' + $scope.character.movies[0].name + ' (' + $scope.character.movies[0].year + '). '
                    + 'He is portrayed by ' + $scope.character.playedBy + '. '
                    + caption + ' Rate Average : ' + $scope.rateAverage + ', Rates count : ' + $scope.character.ratesCount;
                FB.ui({
                    method: 'feed',
                    name: 'Rate for ' + $scope.character.name.toUpperCase(),
                    link: $scope.dataHref(),
                    picture: $scope.character.imgUrl,
                    caption: caption,
                    description: description
                });
            };

            $scope.$watch('userRate', function (newVal, oldVal) {
                if (newVal && newVal != oldVal) {
                    $scope.rateValue = newVal;
                }
            });
        }]);
})();
/**
 * Created by Ruben on 11/20/2016.
 */

(function () {
    'use strict';

    angular.module('iMovieUi')
        .controller('ComicCharacterCtrl', ['$scope', '$window', '$state', '$rootScope', '$location', '$sce', 'ComicCharactersSvc', 'VoteSvc', '$auth',
            function ($scope, $window, $state, $rootScope, $location, $sce, ComicCharactersSvc, VoteSvc, $auth) {


                $scope.activeTab = 0;

                $scope.dataHref = function () {
                    var url = $location.absUrl();
                    return url.replace('localhost:3000', 'imovieui.com');
                };

                $scope.voteStart = false;
                $scope.contentLoaded = false;
                $window.document.title = 'Vote for the best actor of ' + $state.params.name;


                $scope.isAuthenticated = function () {
                    return $auth.isAuthenticated();
                };

                $scope.isActiveTab = function (index) {
                    return $scope.activeTab == index;
                };

                $scope.selectArtist = function (index) {
                    $scope.activeTab = index;
                    $scope.currentArtist = $scope.character.actors[index];
                    if (!!$scope.currentArtist.about && typeof($scope.currentArtist.about) === 'string') {
                        $scope.currentArtist.about = $sce.trustAsHtml($scope.currentArtist.about);
                    }
                };

                ComicCharactersSvc.getSingle($state.params.name)
                    .then(function (response) {
                        $scope.character = response.data;
                        $scope.currentArtist = $scope.character.actors[0];
                        $scope.currentArtist.about = $sce.trustAsHtml($scope.currentArtist.about);
                        $scope.character.about = $sce.trustAsHtml($scope.character.about);
                        $scope.contentLoaded = true;
                        getUserRate();
                    }, function (err) {
                        console.log(err);
                    });

                $scope.vote = function (artistId, same) {
                    if ($scope.isAuthProp) {

                        if (same) {
                            return;
                        }
                        $scope.voteStart = true;
                        var dto = {
                            artistId: artistId,
                            characterId: $scope.character._id
                        };
                        VoteSvc.vote(dto)
                            .then(function (response) {
                                $scope.voteStart = false;
                                $scope.character.actors.filter(function (artist) {
                                    if (artist._id == response.value) {
                                        artist.votedByUser = true;
                                        artist.votesCount += 1;
                                    } else if (artist.votedByUser) {
                                        artist.votesCount -= 1;
                                        delete  artist.votedByUser;
                                    }
                                })
                            }, function (err) {
                                console.log(err);
                            });
                    } else {
                        $rootScope.$broadcast('trigger-modal');
                    }
                };

                $scope.$watch('isAuthProp', function (newVal, oldVal) {
                    if (newVal && oldVal != newVal) {
                        if ($scope.character) {
                            getUserRate();
                        }
                    }
                }, true);

                $scope.fullName = function (artist) {
                    return artist.firstName + ' ' + artist.lastName;
                };

                $scope.shareOnFacebook = function () {

                    var description = 'Choose from ' + $scope.character.actors.length + ' actors who created the best character of ' + $scope.character.name;
                    FB.ui({
                        method: 'feed',
                        name: 'Vote for the best ' + $scope.character.name.toUpperCase() + ' actor.',
                        link: $scope.dataHref(),
                        picture: $scope.character.imgUrl,
                        description: description
                    });
                };

                function getUserRate() {
                    if ($scope.isAuthProp) {
                        VoteSvc.getUserVote($scope.character._id)
                            .then(function (response) {
                                $scope.character.actors.filter(function (artist) {
                                    if (!!response.data && artist._id == response.data.chosen) {
                                        artist.votedByUser = true;
                                    }
                                })
                            }, function (err) {
                                console.log(err);
                            })
                    }
                }

            }]);
})();
/**
 * Created by Ruben on 11/22/2016.
 */

//userRatesCtrl.js
(function () {
    'use strict';

    angular.module('iMovieUi').controller('UserRatesCtrl', ['$scope', 'UserSvc','RateSvc', 'helperSvc','$auth', function ($scope, UserSvc,RateSvc, helperSvc, $auth) {

        $scope.contentLoaded = false;

        if ($auth.isAuthenticated()) {
            UserSvc.ratings()
                .then(function(response) {
                    $scope.topRatings = response.data;

                    $scope.curentRate =response.data[0];
                    $scope.activeTab =$scope.curentRate._id;
                    UserSvc.userRates({value: $scope.curentRate._id})
                        .then(function (response) {
                            $scope.rateValue =response.data.value;
                            $scope.characters = helperSvc.chunk(response.data.characters, 4);
                            $scope.contentLoaded = true;
                        }, function (err) {
                            console.log(err);
                        })

                }, function(err){
                    console.log(err);
                });
        }else{
            window.location='/'
        }

        $scope.getRates = function (index) {
            $scope.activeTab =index;
            $scope.contentLoaded = false;
            UserSvc.userRates({value: index})
                .then(function (response) {
                    $scope.rateValue =response.data.value;
                    $scope.characters = helperSvc.chunk(response.data.characters, 4);
                    $scope.contentLoaded = true;
                }, function (err) {
                    console.log(err);
                })
        };

        $scope.rateFunction = function (value, characterId) {
            if (value == $scope.rateValue) {
                return ;
            }else{
                var dto = {
                    value: value,
                    characterId: characterId
                };

                RateSvc.rate(dto)
                    .then(function (response) {
                        if (response.success) {
                            console.log(response.value);
                        }
                    }, function (err) {
                        console.log(err);
                    })
            }
        };

        $scope.isActiveTab = function(index){
            return $scope.activeTab ==index;
        }
    }]);
})();

