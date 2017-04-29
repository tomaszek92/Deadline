"use strict";

deadlineApp.controller("NavbarCtrl",
    function ($scope, currentUserFactory, navbarFactory) {
        $scope.headerTabName = navbarFactory.headerTabName;
        $scope.tabClick = navbarFactory.tabClick;
        $scope.tabs = navbarFactory.tabs;
        $scope.isLoggedIn = function() {
            return currentUserFactory.getProfile().isLoggedIn;
        };
    });