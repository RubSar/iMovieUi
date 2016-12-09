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

                $scope.rate = function (artistId, index) {
                    if ($scope.isAuthProp) {
                        $scope.voteStart = true;
                        $scope.current = index;
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