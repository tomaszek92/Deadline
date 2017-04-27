"use strict";

deadlineApp.controller("NavbarCtrl",
    function ($scope, currentUser, navBar) {
        $scope.pageTitle = navBar.pageTitle;
        $scope.tabClick = navBar.tabClick;
        $scope.tabs = navBar.tabs;
        $scope.isLoggedIn = function () {
            return currentUser.getProfile().isLoggedIn;
        };
    });