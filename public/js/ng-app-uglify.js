!function(){angular.module("iMovieUi",["satellizer"]).config(["$authProvider","$httpProvider",function(e,t){t.interceptors.push("authInterceptor"),e.facebook({clientId:"175488799579769"})}])}(),function(){angular.module("iMovieUi").factory("authToken",["$window",function(e){var t,a=e.localStorage,r="satellizer_token",n=!1,i={setToken:function(e){t=e,a.setItem(r,e),n=!0},getToken:function(){return t||(t=a.getItem(r)),t},isAuthenticated:function(){return!!i.getToken()},removeToken:function(){t=null,a.removeItem(r),n=!1}};return i}])}(),function(){angular.module("iMovieUi").factory("authInterceptor",["authToken",function(e){return{request:function(t){var a=e.getToken();return a&&(t.headers.Authorization="Bearer "+a),t},response:function(e){return e}}}])}(),function(){angular.module("iMovieUi").factory("helperSvc",["$http","$q",function(e,t){function a(a){var r=t.defer();return e(a).success(function(e,t,a,n){r.resolve(e)}).error(function(e,t,a,n){r.reject(t)}),r.promise}function r(e,t){for(var a=[],r=0;r<e.length;r+=t)a.push(e.slice(r,r+t));return a}function n(e,t){if(1==arguments.length)return Math.round(e);var a=Math.pow(10,t);return Math.round(e*a)/a}function i(){return window.innerWidth>768}return{requestHandler:a,chunk:r,decimalRound:n,isDesktop:i}}])}(),function(){angular.module("iMovieUi").factory("MovieCharacterSvs",["helperSvc",function(e){function t(){return e.requestHandler({method:"GET",url:"/api/movieCharacters/all"})}function a(){return e.requestHandler({method:"GET",url:"/api/movieCharacters/top"})}function r(){return e.requestHandler({method:"GET",url:"/api/movieCharacters/artists"})}function n(){return e.requestHandler({method:"GET",url:"/api/movieCharacters/movies"})}function i(){return e.requestHandler({method:"GET",url:"/api/movieCharacters/years"})}function o(t){return e.requestHandler({method:"GET",url:"/api/movieCharacters/byArtist",params:{artist:t}})}function c(t){return e.requestHandler({method:"GET",url:"/api/movieCharacters/byYear",params:{year:t}})}function s(t){return e.requestHandler({method:"GET",url:"/api/movieCharacters/byMovie",params:{movieName:t}})}function u(t){return e.requestHandler({method:"GET",url:"/api/movieCharacters/list",params:t})}function l(t){return e.requestHandler({method:"GET",url:"/api/movieCharacters/single",params:{name:t}})}function d(t){return e.requestHandler({method:"GET",url:"/api/movieCharacters/search",params:t})}function h(t){return e.requestHandler({method:"GET",url:"/api/movieCharacters/recommended",params:t})}return{getAll:t,getTopCharacters:a,getArtists:r,getMovies:n,getCharactersByMovie:s,getCharactersByArtist:o,getCharactersByMovieReleaseDate:c,getOrderedYears:i,getCharactersList:u,getMovieCharacter:l,getRecommended:h,searchCharacters:d}}])}(),function(){"use strict";angular.module("iMovieUi").factory("ComicsCharactersSvc",["helperSvc",function(e){function t(){return e.requestHandler({method:"GET",url:"/api/comicsCharacters/all"})}function a(t){return e.requestHandler({method:"GET",url:"/api/comicsCharacters/single",params:{name:t}})}return{getAll:t,getSingle:a}}])}(),function(){"use strict";angular.module("iMovieUi").factory("RateSvc",["helperSvc",function(e){function t(t){return e.requestHandler({method:"POST",url:"/api/rate/set",data:t})}function a(t){return e.requestHandler({method:"GET",url:"/api/rate/rates",params:{characterId:t}})}function r(t){return e.requestHandler({method:"Post",url:"/api/rate/userRatesByMovies",data:{movies:t}})}return{rate:t,getRates:a,userRatesForMovies:r}}])}(),function(){"use strict";angular.module("iMovieUi").factory("VoteSvc",["helperSvc",function(e){function t(t){return e.requestHandler({method:"POST",url:"/api/vote/set",data:t})}function a(t){return e.requestHandler({method:"GET",url:"/api/vote/user",params:{characterId:t}})}return{vote:t,getUserVote:a}}])}(),function(){"use strict";angular.module("iMovieUi").factory("UserSvc",["helperSvc",function(e){function t(t){return e.requestHandler({method:"GET",url:"/api/user/rates",params:t})}function a(){return e.requestHandler({method:"GET",url:"/api/user/topRatings"})}return{userRates:t,ratings:a}}])}(),function(){angular.module("iMovieUi").directive("mcDropdown",function(){return{scope:{model:"=",itemsList:"=",term:"@",label:"@"},link:function(e,t,a){e.$watch("itemsList",function(t,a){t&&t.length&&(e.itemIsArray=Array.isArray(e.itemsList[0][e.term]))},!0),e.setModel=function(t){var a=$.grep(e.itemsList,function(a){return a[e.term]==t})[0];e.model=angular.copy(a)}},templateUrl:"/angular/directives/dropdown/dropdown.html"}})}(),function(){"use strict";angular.module("iMovieUi").directive("starRating",["$auth","$rootScope",function(e,t){return{restrict:"E",scope:{ratingValue:"=",max:"=",userRate:"=",onRatingSelected:"&"},link:function(a,r,n){a.max=a.max||10,a.ratingValue=a.ratingValue||1,a.isAuthenticated=function(){return e.isAuthenticated()},a.triggerModal=function(){t.$broadcast("trigger-modal")};var i=function(){a.stars=[];for(var e=0;e<a.max;e++)a.stars.push({filled:e<a.ratingValue})};a.toggle=function(e){a.rateMode=!1,a.ratingValue=e+1,a.onRatingSelected({rating:e+1})},a.$watch("ratingValue",function(e,t){t&&i()})},templateUrl:"/angular/directives/starRating/rating.html"}}])}(),function(){"use strict";angular.module("iMovieUi").directive("character",["RateSvc","helperSvc",function(e,t){return{restrict:"E",scope:{model:"="},link:function(a,r,n){a.rateValue=1,a.avgUpdate=!1,a.$watch("model.userRate",function(e,t){e&&e!=t&&(a.rateValue=e)}),a.rateAverage=a.model.ratesValue>0?t.decimalRound(a.model.ratesValue/a.model.ratesCount,1):0,a.rateFunction=function(r){var n={value:r,characterId:a.model._id};a.avgUpdate=!0,e.rate(n).then(function(e){e.success&&("created"==e.message?(a.model.ratesCount+=1,a.model.ratesValue+=e.value):a.model.ratesValue+=e.dif,a.avgUpdate=!1,a.rateAverage=a.model.ratesValue>0?t.decimalRound(a.model.ratesValue/a.model.ratesCount,1):0)},function(e){console.log(e)})}},templateUrl:"/angular/directives/character/character.html"}}])}(),function(){"use strict";angular.module("iMovieUi").directive("modal",function(){return{template:'<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-body" ng-transclude></div></div></div></div>',restrict:"E",transclude:!0,replace:!0,scope:!0,link:function(e,t,a){e.$watch(a.visible,function(e){1==e?$(t).modal("show"):$(t).modal("hide")}),$(t).on("shown.bs.modal",function(){e.$apply(function(){e.$parent[a.visible]=!0})}),$(t).on("hidden.bs.modal",function(){e.$apply(function(){e.$parent[a.visible]=!1})})}}})}(),function(){"use strict";angular.module("iMovieUi").directive("paging",function(){function e(e,t,a){e.$watchCollection("[page,pageSize,total,disabled]",function(){d(e,a)})}function t(e,t){return'<ul data-ng-hide="Hide" data-ng-class="ulClass"> <li title="{{Item.title}}" data-ng-class="Item.liClass" data-ng-repeat="Item in List"> <a '+(t.pgHref?'data-ng-href="{{Item.pgHref}}" ':"href ")+'data-ng-class="Item.aClass" data-ng-click="Item.action()" data-ng-bind="Item.value"></a> </li></ul>'}function a(e,t){e.List=[],e.Hide=!1,e.page=parseInt(e.page)||1,e.total=parseInt(e.total)||0,e.adjacent=parseInt(e.adjacent)||2,e.pgHref=e.pgHref||"",e.dots=e.dots||"...",e.ulClass=e.ulClass||"pagination",e.activeClass=e.activeClass||"active",e.disabledClass=e.disabledClass||"disabled",e.textFirst=e.textFirst||"<<",e.textLast=e.textLast||">>",e.textNext=e.textNext||">",e.textPrev=e.textPrev||"<",e.textFirstClass=e.textFirstClass||"",e.textLastClass=e.textLastClass||"",e.textNextClass=e.textNextClass||"",e.textPrevClass=e.textPrevClass||"",e.textTitlePage=e.textTitlePage||"Page {page}",e.textTitleFirst=e.textTitleFirst||"First Page",e.textTitleLast=e.textTitleLast||"Last Page",e.textTitleNext=e.textTitleNext||"Next Page",e.textTitlePrev=e.textTitlePrev||"Previous Page",e.hideIfEmpty=r(e,t.hideIfEmpty),e.showPrevNext=r(e,t.showPrevNext),e.showFirstLast=r(e,t.showFirstLast),e.scrollTop=r(e,t.scrollTop),e.isDisabled=r(e,t.disabled)}function r(e,t){return!!angular.isDefined(t)&&!!e.$parent.$eval(t)}function n(e,t){e.page>t&&(e.page=t),e.page<=0&&(e.page=1),e.adjacent<=0&&(e.adjacent=2),t<=1&&(e.Hide=e.hideIfEmpty)}function i(e,t){e.page!=t&&(e.isDisabled||(e.page=t,e.pagingAction({page:e.page,pageSize:e.pageSize,total:e.total}),e.scrollTop&&scrollTo(0,0)))}function o(e,t,a){if(!(!e.showPrevNext&&!e.showFirstLast||t<1)){var r,n,o;if("prev"===a){r=e.page-1<=0;var c=e.page-1<=0?1:e.page-1;e.showFirstLast&&(n={value:e.textFirst,title:e.textTitleFirst,aClass:e.textFirstClass,page:1}),e.showPrevNext&&(o={value:e.textPrev,title:e.textTitlePrev,aClass:e.textPrevClass,page:c})}else{r=e.page+1>t;var s=e.page+1>=t?t:e.page+1;e.showPrevNext&&(n={value:e.textNext,title:e.textTitleNext,aClass:e.textNextClass,page:s}),e.showFirstLast&&(o={value:e.textLast,title:e.textTitleLast,aClass:e.textLastClass,page:t})}var u=function(t,a){return{title:t.title,aClass:t.aClass,value:t.aClass?"":t.value,liClass:a?e.disabledClass:"",pgHref:a?"":e.pgHref.replace(h,t.page),action:function(){a||i(e,t.page)}}};if(e.isDisabled&&(r=!0),n){var l=u(n,r);e.List.push(l)}if(o){var d=u(o,r);e.List.push(d)}}}function c(e,t,a){var r=0;for(r=e;r<=t;r++){var n=a.pgHref.replace(h,r),o=a.page==r?a.activeClass:"";a.isDisabled&&(n="",o=a.disabledClass),a.List.push({value:r,title:a.textTitlePage.replace(h,r),liClass:o,pgHref:n,action:function(){i(a,this.value)}})}}function s(e){e.List.push({value:e.dots,liClass:e.disabledClass})}function u(e,t){c(1,2,e),3!=t&&s(e)}function l(e,t,a){a!=e-2&&s(t),c(e-1,e,t)}function d(e,t){(!e.pageSize||e.pageSize<=0)&&(e.pageSize=1);var r=Math.ceil(e.total/e.pageSize);a(e,t),n(e,r);var i,s,d=2*e.adjacent+2;o(e,r,"prev"),r<=d+2?(i=1,c(i,r,e)):e.page-e.adjacent<=2?(i=1,s=1+d,c(i,s,e),l(r,e,s)):e.page<r-(e.adjacent+2)?(i=e.page-e.adjacent,s=e.page+e.adjacent,u(e,i),c(i,s,e),l(r,e,s)):(i=r-d,s=r,u(e,i),c(i,s,e)),o(e,r,"next")}var h=/\{page\}/g;return{restrict:"EA",link:e,template:t,scope:{page:"=",pageSize:"=",total:"=",disabled:"@",dots:"@",ulClass:"@",activeClass:"@",disabledClass:"@",adjacent:"@",pagingAction:"&",pgHref:"@",textFirst:"@",textLast:"@",textNext:"@",textPrev:"@",textFirstClass:"@",textLastClass:"@",textNextClass:"@",textPrevClass:"@",textTitlePage:"@",textTitleFirst:"@",textTitleLast:"@",textTitleNext:"@",textTitlePrev:"@"}}})}(),function(){angular.module("iMovieUi").controller("headerCtrl",["$scope","$auth","$rootScope",function(e,t,a){e.authenticate=function(a){e.showModal=!1,t.authenticate(a)},e.isAuthenticated=function(){return t.isAuthenticated()},e.showModal=!1,e.$on("trigger-modal",function(t){e.showModal=!e.showModal}),e.logOut=function(){t.logout()},e.makeSearch=function(){if(e.searchTerm.length){var t=encodeURI(e.searchTerm);window.location.href.includes("most-popular-movie-characters")?a.$broadcast("new-search",{term:t}):window.location.href="/most-popular-movie-characters?term="+t}}}])}(),function(){"use strict";angular.module("iMovieUi").controller("HomeCtrl",["$scope","MovieCharacterSvs","helperSvc","RateSvc","$auth",function(e,t,a,r,n){function i(t){for(var a=0;a<t.length;a++)for(var r=0;r<e.originalMovieCharacters.length;r++)t[a].characterId==e.originalMovieCharacters[r]._id&&(e.originalMovieCharacters[r].userRate=t[a].value)}function o(){if(e.originalMovieCharacters&&e.isAuthProp){var t=e.originalMovieCharacters.map(function(e){return{_id:e._id}});r.userRatesForMovies(t).then(function(e){e.success&&i(e.data)},function(e){console.log(e)})}}t.getTopCharacters().then(function(t){e.originalMovieCharacters=t.data},function(e){console.log(e)}),e.$watch("originalMovieCharacters",function(t,r){t&&(e.movieCharacters=a.chunk(t,2),o())},!0),e.isAuthenticated=function(){return n.isAuthenticated()},e.$watch("isAuthProp",function(e,t){e&&o()},!0)}])}(),function(){angular.module("iMovieUi").controller("MovieCharactersListCtrl",["$scope","$timeout","MovieCharacterSvs","RateSvc","helperSvc","$auth","$window",function(e,t,a,r,n,i,o){function c(t){for(var a=0;a<t.length;a++)for(var r=0;r<e.originalMovieCharacters.length;r++)t[a].characterId==e.originalMovieCharacters[r]._id&&(e.originalMovieCharacters[r].userRate=t[a].value)}function s(){if(e.originalMovieCharacters&&e.isAuthProp){var t=e.originalMovieCharacters.map(function(e){return{_id:e._id}});r.userRatesForMovies(t).then(function(e){e.success&&c(e.data)},function(e){console.log(e)})}}e.contentLoaded=!1,e.paging={},e.paging.number=1,e.paging.size=10,e._searchTerm=o.location.href.split("?term=")[1],e.searchTerm=e._searchTerm?decodeURI(e._searchTerm):"",e.filteredBy=void 0,e.predicate="movie",e.isAuthenticated=function(){return i.isAuthenticated()},a.getArtists().then(function(t){e.artists=t.data},function(e){console.log(e)}),a.getOrderedYears().then(function(t){e.years=t.data},function(e){console.log(e)}),a.getMovies().then(function(t){e.movies=t.data},function(e){console.log(e)}),e.$on("new-search",function(t,r){a.searchCharacters({term:r.term}).then(function(t){t.data.length>0?(e.notFoundForTerm=!1,e.originalMovieCharacters=t.data,e.listCharacters=n.chunk(t.data,2)):(e.notFoundForTerm=!0,e.listCharacters=[]),e.count=0,e.contentLoaded=!0,e.filteredBy={key:"Searched By",value:decodeURI(r.term)}},function(e){console.log(e)})}),e.getAll=function(){var t="?term="+e._searchTerm,r=o.location.href;r.indexOf("?term=")&&(window.location.href=r.replace(t,"")),e.filteredBy=void 0,e._searchTerm=void 0,a.getCharactersList(e.paging).then(function(t){e.originalMovieCharacters=t.data,e.listCharacters=n.chunk(t.data,2),e.count=t.count,e.contentLoaded=!0},function(e){console.log(e)})},e.$watch("paging.number",function(t,r){t&&(e.contentLoaded=!1,e._searchTerm?a.searchCharacters({term:e._searchTerm}).then(function(t){t.data.length>0?(e.notFoundForTerm=!1,e.originalMovieCharacters=t.data,e.listCharacters=n.chunk(t.data,2),e.count=t.count):(e.listCharacters=[],e.notFoundForTerm=!0),e.contentLoaded=!0,e.filteredBy={key:"Searched By",value:decodeURI(e._searchTerm)}},function(e){console.log(e)}):a.getCharactersList(e.paging).then(function(t){e.originalMovieCharacters=t.data,e.listCharacters=n.chunk(t.data,2),e.count=t.count,e.contentLoaded=!0},function(e){console.log(e)}))},!0),e.$watch("isAuthProp",function(e,t){e&&s()},!0),e.$watch("originalMovieCharacters",function(e,t){e&&s()},!0),e.$watch("artist",function(t,r){t&&t!=r&&a.getCharactersByArtist(e.artist._id).then(function(a){e.originalMovieCharacters=a.data,e.count=a.data.length,e.listCharacters=n.chunk(a.data,2),e.filteredBy={key:"Filtered By Artist",value:t._id}},function(e){console.log(e)})}),e.$watch("year",function(t,r){t&&t!=r&&a.getCharactersByMovieReleaseDate(t._id[0]).then(function(a){e.originalMovieCharacters=a.data,e.count=a.data.length,e.listCharacters=n.chunk(a.data,2),e.filteredBy={key:"Filtered By Year",value:t._id[0]}},function(e){console.log(e)})}),e.$watch("movie",function(t,r){t&&t!=r&&a.getCharactersByMovie(t._id[0]).then(function(a){e.originalMovieCharacters=a.data,e.count=a.data.length,e.listCharacters=n.chunk(a.data,2),e.filteredBy={key:"Filtered By Movie",value:t._id[0]}},function(e){console.log(e)})})}])}(),function(){"use strict";angular.module("iMovieUi").controller("MovieCharacterCtrl",["$scope","$window","MovieCharacterSvs","RateSvc","$auth","helperSvc",function(e,t,a,r,n,i){var o=t.location.pathname.split("/movie-character/")[1];e.rateValue=1,e.dataHref=document.URL,e.contentLoaded=!1,e.avgUpdate=!1,e.isDesktop=i.isDesktop(),e.isAuthenticated=function(){return n.isAuthenticated()},a.getMovieCharacter(o).then(function(t){if(e.character=t.character,e.userRate=t.userRate,e.rateAverage=e.character.ratesValue>0?i.decimalRound(e.character.ratesValue/e.character.ratesCount,1):0,e.contentLoaded=!0,e.isDesktop){var r={movie:t.character.movies[0].name,artist:t.character.playedBy,year:t.character.movies[0].year};a.getRecommended(r).then(function(t){e.recommended=t.data},function(e){console.log(e)})}},function(e){console.log(e)}),e.rateFunction=function(t){var a={value:t,characterId:e.character._id};e.avgUpdate=!0,r.rate(a).then(function(t){t.success&&("created"==t.message?(e.character.ratesCount+=1,e.character.ratesValue+=t.value,e.userRate=t.value):(e.character.ratesValue+=t.dif,e.userRate+=t.dif),e.avgUpdate=!1,e.rateAverage=e.character.ratesValue>0?e.character.ratesValue/e.character.ratesCount:0)},function(e){console.log(e)})},e.$watch("userRate",function(t,a){t&&t!=a&&(e.rateValue=t)})}])}(),function(){"use strict";angular.module("iMovieUi").controller("ComicsCharacterCtrl",["$scope","$window","$rootScope","ComicsCharactersSvc","VoteSvc","$auth",function(e,t,a,r,n,i){function o(){e.isAuthProp&&n.getUserVote(e.character._id).then(function(t){e.character.actors.filter(function(e){e._id==t.data.chosen&&(e.votedByUser=!0)})},function(e){console.log(e)})}var c=t.location.pathname.split("/comics-character/")[1];e.dataHref=document.URL,e.voteStart=!1,e.contentLoaded=!1,e.isAuthenticated=function(){return i.isAuthenticated()},r.getSingle(c).then(function(t){e.character=t.data,e.contentLoaded=!0,o()},function(e){console.log(e)}),e.vote=function(t,r){if(e.isAuthProp){if(r)return;e.voteStart=!0;var i={artistId:t,characterId:e.character._id};n.vote(i).then(function(t){e.voteStart=!1,e.character.actors.filter(function(e){e._id==t.value?(e.votedByUser=!0,e.votesCount+=1):e.votedByUser&&(e.votesCount-=1,delete e.votedByUser)})},function(e){console.log(e)})}else a.$broadcast("trigger-modal")},e.$watch("isAuthProp",function(t,a){t&&a!=t&&e.character&&o()},!0)}])}(),function(){"use strict";angular.module("iMovieUi").controller("UserRatesCtrl",["$scope","UserSvc","RateSvc","helperSvc","$auth",function(e,t,a,r,n){e.contentLoaded=!1,n.isAuthenticated()?t.ratings().then(function(a){e.topRatings=a.data,e.curentRate=a.data[0],e.activeTab=e.curentRate._id,t.userRates({value:e.curentRate._id}).then(function(t){e.rateValue=t.data.value,e.characters=r.chunk(t.data.characters,4),e.contentLoaded=!0},function(e){console.log(e)})},function(e){console.log(e)}):window.location="/",e.getRates=function(a){e.activeTab=a,e.contentLoaded=!1,t.userRates({value:a}).then(function(t){e.rateValue=t.data.value,e.characters=r.chunk(t.data.characters,4),e.contentLoaded=!0},function(e){console.log(e)})},e.rateFunction=function(t,r){if(t!=e.rateValue){var n={value:t,characterId:r};a.rate(n).then(function(e){e.success&&console.log(e.value)},function(e){console.log(e)})}},e.isActiveTab=function(t){return e.activeTab==t}}])}();