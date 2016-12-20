/**
 * Created by Ruben on 11/11/2016.
 */
(function () {
    angular.module('iMovieUi', ['satellizer'])
        .config(['$authProvider','$httpProvider',function ($authProvider, $httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
            $authProvider.facebook({
                clientId: '175488799579769'
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
    angular.module('iMovieUi').factory('MovieCharacterSvs',['helperSvc', function (helperSvc) {

        function getAll(){
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/all'});
        }

        function getTopCharacters() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/top'});
        }

        function getArtists() {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/artists'});
        }

        function getMovies(){
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/movies'})
        }

        function getOrderedYears(){
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/years'});
        }

        function getCharactersByArtist(artist) {
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/byArtist', params:{artist:artist}});
        }

        function getCharactersByMovieReleaseDate(year){
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/byYear', params:{year:year}});
        }

        function getCharactersByMovie(movieName){
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/byMovie', params:{movieName:movieName}});
        }

        function getCharactersList(paging){
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/list', params:paging});
        }
        function getMovieCharacter(name){
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/single', params:{name:name}});
        }

        function searchCharacters(model){
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/search', params:model});
        }

        function getRecommended(model){
            return helperSvc.requestHandler({method: 'GET', url: '/api/movieCharacters/recommended', params:model});
        }

        return {
            getAll:getAll,
            getTopCharacters: getTopCharacters,
            getArtists: getArtists,
            getMovies:getMovies,
            getCharactersByMovie:getCharactersByMovie,
            getCharactersByArtist: getCharactersByArtist,
            getCharactersByMovieReleaseDate:getCharactersByMovieReleaseDate,
            getOrderedYears:getOrderedYears,
            getCharactersList:getCharactersList,
            getMovieCharacter:getMovieCharacter,
            getRecommended:getRecommended,
            searchCharacters:searchCharacters
        }
    }])
})();
/**
 * Created by Ruben on 11/12/2016.
 */

(function () {
    'use strict';

    angular.module('iMovieUi').factory('ComicsCharactersSvc',['helperSvc', function (helperSvc) {

       function getAll(){
           return helperSvc.requestHandler({method: 'GET', url: '/api/comicsCharacters/all'});
       }

        function getSingle(name){
            return helperSvc.requestHandler({method: 'GET', url: '/api/comicsCharacters/single', params:{name:name}});
        }

       return{
           getAll:getAll,
           getSingle:getSingle
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
        function userRatesForMovies(movies){
            return helperSvc.requestHandler({method: 'Post', url: '/api/rate/userRatesByMovies', data:{movies:movies}});
        }

        return {
            rate: rate,
            getRates:getRates,
            userRatesForMovies:userRatesForMovies
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
/**
 * Created by Ruben on 11/8/2016.
 */

(function () {
    angular.module('iMovieUi').controller('headerCtrl', ['$scope', '$auth', '$rootScope', function ($scope, $auth, $rootScope) {

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
                var term = encodeURI($scope.searchTerm);
                if (window.location.href.includes('most-popular-movie-characters')) {
                    $rootScope.$broadcast('new-search', {term: term});
                } else {
                    window.location.href = '/most-popular-movie-characters?term=' + term;
                }

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

    angular.module('iMovieUi').controller('HomeCtrl', ['$scope', 'MovieCharacterSvs', 'helperSvc', 'RateSvc', '$auth', function ($scope, MovieCharacterSvs, helperSvc, RateSvc, $auth) {
        //get movie characters
        MovieCharacterSvs.getTopCharacters()
            .then(function (response) {
                $scope.originalMovieCharacters = response.data;
            }, function (err) {
                console.log(err);
            });


        $scope.$watch('originalMovieCharacters', function (newVal, oldVal) {
            if (!!newVal) {
                $scope.movieCharacters = helperSvc.chunk(newVal, 2);
                getUserRates();
            }
        }, true);


        $scope.isAuthenticated = function () {
            return $auth.isAuthenticated();
        };


        $scope.$watch('isAuthProp', function (newVal, oldVal) {
            if (newVal) {
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
            if (!!$scope.originalMovieCharacters && $scope.isAuthProp) {
                var movieCharacterIds = $scope.originalMovieCharacters.map(function (a) {
                    return {_id: a._id};
                });
                RateSvc.userRatesForMovies(movieCharacterIds)
                    .then(function (response) {
                        if (response.success) {
                            insertUserRating(response.data);
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
    angular.module('iMovieUi').controller('MovieCharactersListCtrl', ['$scope', '$timeout', 'MovieCharacterSvs', 'RateSvc', 'helperSvc', '$auth', '$window',
        function ($scope, $timeout, MovieCharacterSvs, RateSvc, helperSvc, $auth, $window) {

            $scope.contentLoaded = false;

            $scope.paging = {};
            $scope.paging.number = 1;
            $scope.paging.size = 10;


            $scope._searchTerm = $window.location.href.split('?term=')[1];
            //only for input form
            $scope.searchTerm = $scope._searchTerm ? decodeURI($scope._searchTerm) : '';
            $scope.filteredBy = undefined;
            $scope.predicate = 'movie';

            $scope.isAuthenticated = function () {
                return $auth.isAuthenticated();
            };


            MovieCharacterSvs.getArtists()
                .then(function (response) {
                    $scope.artists = response.data;
                },
                function (err) {
                    console.log(err);
                });

            MovieCharacterSvs.getOrderedYears()
                .then(function (response) {
                    $scope.years = response.data;
                }, function (err) {
                    console.log(err);
                });

            MovieCharacterSvs.getMovies()
                .then(function (response) {
                    $scope.movies = response.data;
                }, function (err) {
                    console.log(err);
                });


            $scope.$on('new-search', function (event, args) {

                MovieCharacterSvs.searchCharacters({term: args.term})
                    .then(function (response) {
                        if (response.data.length > 0) {
                            $scope.notFoundForTerm = false;
                            $scope.originalMovieCharacters = response.data;
                            $scope.listCharacters = helperSvc.chunk(response.data, 2);
                        } else {
                            $scope.notFoundForTerm = true;
                            $scope.listCharacters=[];

                        }
                        $scope.count = 0;
                        $scope.contentLoaded = true;
                        $scope.filteredBy = {
                            key: 'Searched By',
                            value: decodeURI(args.term)
                        };
                    },
                    function (msg) {
                        console.log(msg);
                    });

            });

            $scope.getAll = function () {
                var _concat = '?term=' + $scope._searchTerm;
                var _href = $window.location.href;
                if (_href.indexOf('?term=')) {
                    window.location.href = _href.replace(_concat, '');
                }
                $scope.filteredBy = undefined;
                $scope._searchTerm = undefined;

                MovieCharacterSvs.getCharactersList($scope.paging)
                    .then(function (response) {
                        $scope.originalMovieCharacters = response.data;
                        $scope.listCharacters = helperSvc.chunk(response.data, 2);
                        $scope.count = response.count;
                        $scope.contentLoaded = true;
                    },
                    function (msg) {
                        console.log(msg);
                    });
            };

            $scope.$watch('paging.number', function (newVal, oldVal) {
                if (newVal) {
                    $scope.contentLoaded = false;
                    if (!$scope._searchTerm) {
                        MovieCharacterSvs.getCharactersList($scope.paging)
                            .then(function (response) {
                                $scope.originalMovieCharacters = response.data;
                                $scope.listCharacters = helperSvc.chunk(response.data, 2);
                                $scope.count = response.count;
                                $scope.contentLoaded = true;
                            },
                            function (msg) {
                                console.log(msg);
                            });
                    } else {
                        MovieCharacterSvs.searchCharacters({term: $scope._searchTerm})
                            .then(function (response) {
                                if (response.data.length > 0) {
                                    $scope.notFoundForTerm = false;
                                    $scope.originalMovieCharacters = response.data;
                                    $scope.listCharacters = helperSvc.chunk(response.data, 2);
                                    $scope.count = response.count;

                                } else {
                                    $scope.listCharacters=[];
                                    $scope.notFoundForTerm = true;
                                }
                                $scope.contentLoaded = true;


                                $scope.filteredBy = {
                                    key: 'Searched By',
                                    value: decodeURI($scope._searchTerm)
                                };
                            },
                            function (msg) {
                                console.log(msg);
                            });
                    }
                }
            }, true);

            $scope.$watch('isAuthProp', function (newVal, oldVal) {
                if (newVal) {
                    getUserRates();
                }

            }, true);

            $scope.$watch('originalMovieCharacters', function (newVal, oldVal) {
                if (!!newVal) {
                    getUserRates();
                }
            }, true);

            $scope.$watch('artist', function (newValue, oldValue) {
                if (!!newValue && newValue != oldValue) {
                    MovieCharacterSvs.getCharactersByArtist($scope.artist._id)
                        .then(function (response) {
                            $scope.originalMovieCharacters = response.data;
                            $scope.count = response.data.length;
                            $scope.listCharacters = helperSvc.chunk(response.data, 2);

                            $scope.filteredBy = {
                                key: 'Filtered By Artist',
                                value: newValue._id
                            }
                        },
                        function (err) {
                            console.log(err);
                        });
                }
            });

            $scope.$watch('year', function (newValue, oldValue) {
                if (!!newValue && newValue != oldValue) {
                    MovieCharacterSvs.getCharactersByMovieReleaseDate(newValue._id[0])
                        .then(function (response) {
                            $scope.originalMovieCharacters = response.data;
                            $scope.count = response.data.length;
                            $scope.listCharacters = helperSvc.chunk(response.data, 2);
                            $scope.filteredBy = {
                                key: 'Filtered By Year',
                                value: newValue._id[0]
                            }
                        },
                        function (err) {
                            console.log(err);
                        });
                }
            });

            $scope.$watch('movie', function (newValue, oldValue) {
                if (!!newValue && newValue != oldValue) {
                    MovieCharacterSvs.getCharactersByMovie(newValue._id[0])
                        .then(function (response) {
                            $scope.originalMovieCharacters = response.data;
                            $scope.count = response.data.length;
                            $scope.listCharacters = helperSvc.chunk(response.data, 2);
                            $scope.filteredBy = {
                                key: 'Filtered By Movie',
                                value: newValue._id[0]
                            }
                        },
                        function (err) {
                            console.log(err);
                        });
                }
            });

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
                if (!!$scope.originalMovieCharacters && $scope.isAuthProp) {
                    var movieCharacterIds = $scope.originalMovieCharacters.map(function (a) {
                        return {_id: a._id};
                    });
                    RateSvc.userRatesForMovies(movieCharacterIds)
                        .then(function (response) {
                            if (response.success) {
                                insertUserRating(response.data);
                            }
                        }, function (err) {
                            console.log(err);
                        });
                }

            }

        }])
})();



/**
 * Created by Ruben on 11/17/2016.
 */

//movieCharacterCtrl.js
(function () {
    'use strict';

    angular.module('iMovieUi').controller('MovieCharacterCtrl', ['$scope', '$window', 'MovieCharacterSvs', 'RateSvc', '$auth', 'helperSvc', function ($scope, $window, MovieCharacterSvs, RateSvc, $auth, helperSvc) {

        var name = $window.location.pathname.split('/movie-character/')[1];
        $scope.rateValue = 1;
        $scope.dataHref = document.URL;
        $scope.contentLoaded = false;
        $scope.avgUpdate = false;
        $scope.isDesktop =helperSvc.isDesktop();


        $scope.isAuthenticated = function () {
            return $auth.isAuthenticated();
        };

        MovieCharacterSvs.getMovieCharacter(name)
            .then(function (response) {
                $scope.character = response.character;
                $scope.userRate = response.userRate;
                $scope.rateAverage = $scope.character.ratesValue>0
                    ? helperSvc.decimalRound($scope.character.ratesValue/$scope.character.ratesCount,1)
                    : 0;
                $scope.contentLoaded = true;
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
                        else{
                            $scope.character.ratesValue+= response.dif;
                            $scope.userRate +=response.dif;
                        }

                        $scope.avgUpdate = false;
                        $scope.rateAverage = $scope.character.ratesValue>0 ? $scope.character.ratesValue/$scope.character.ratesCount : 0;
                    }
                }, function (err) {
                    console.log(err);
                })
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
        .controller('ComicsCharacterCtrl', ['$scope', '$window', '$rootScope', 'ComicsCharactersSvc', 'VoteSvc', '$auth',
            function ($scope, $window, $rootScope, ComicsCharactersSvc, VoteSvc, $auth) {

                var url = $window.location.pathname.split('/comics-character/')[1];
                $scope.dataHref = document.URL;
                $scope.voteStart = false;
                $scope.contentLoaded = false;

                $scope.isAuthenticated = function () {
                    return $auth.isAuthenticated();
                };

                ComicsCharactersSvc.getSingle(url)
                    .then(function (response) {
                        $scope.character = response.data;
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

                function getUserRate() {
                    if ($scope.isAuthProp) {
                        VoteSvc.getUserVote($scope.character._id)
                            .then(function (response) {
                                $scope.character.actors.filter(function (artist) {
                                    if (artist._id == response.data.chosen) {
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

