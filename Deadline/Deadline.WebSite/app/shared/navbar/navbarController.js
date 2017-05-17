"use strict";

deadlineApp.controller("NavbarCtrl",
    function($scope, currentUserFactory, navbarFactory, companiesResource) {
        $scope.headerTabName = navbarFactory.headerTabName;
        $scope.tabClick = navbarFactory.tabClick;
        $scope.tabs = navbarFactory.tabs;
        $scope.accountBalance = currentUserFactory.getProfile().accountBalance;
        $scope.leftRounds = currentUserFactory.getProfile().leftRounds;

        $scope.$watch(
            function () {
                return currentUserFactory.getProfile();
            },
            function(newValue, oldValue) {
                console.log(newValue, oldValue);
            });

        $scope.isLoggedIn = function() {
            return currentUserFactory.getProfile().isLoggedIn;
        };

        $scope.nextRound = function() {
            companiesResource.actions().nextRound(
                {},
                function() {
                    $scope.leftRounds--;
                },
                function() {
                    Materialize.toast("Cannot make next round. Please try again later.", 10000);
                });
        }
    });