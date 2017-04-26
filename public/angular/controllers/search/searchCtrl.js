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


