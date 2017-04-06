"use strict";

deadlineApp.controller("NavbarCtrl",
    function($scope, currentUser) {
        $scope.pageTitle = "";
        $scope.isLoggedIn = function() {
            return currentUser.getProfile().isLoggedIn;
        };
        $scope.tabClick = function(tab) {
            $scope.pageTitle = tab.title;
            for (let i = 0; i < $scope.tabs.length; i++) {
                $scope.tabs[i].isActive = false;
            }
            tab.isActive = true;
        }
        $scope.tabs = [
            {
                href: "#singIn",
                isSubHeader: false,
                isActive: false,
                title: "Sign in",
                visibleForLoggedUser: false,
                isDivider: false
            },
            {
                href: "#signUp",
                isSubHeader: false,
                isActive: false,
                title: "Sign up",
                visibleForLoggedUser: false,
                isDivider: false
            },
            {
                href: "#",
                isSubHeader: true,
                isActive: false,
                title: "Employees",
                visibleForLoggedUser: true,
                icon: "contacts",
                isDivider: false
            },
            {
                href: "#",
                isSubHeader: false,
                isActive: false,
                title: "Hire",
                visibleForLoggedUser: true,
                isDivider: false
            },
            {
                href: "#",
                isSubHeader: false,
                isActive: false,
                title: "Own",
                visibleForLoggedUser: true,
                isDivider: false
            },
            {
                visibleForLoggedUser: true,
                isDivider: true
            },
            {
                href: "#",
                isSubHeader: true,
                isActive: false,
                title: "Projects",
                visibleForLoggedUser: true,
                icon: "shopping_basket",
                isDivider: false
            },
            {
                href: "#",
                isSubHeader: false,
                isActive: false,
                title: "Search",
                visibleForLoggedUser: true,
                isDivider: false
            },
            {
                href: "#",
                isSubHeader: false,
                isChildren: true,
                title: "Own",
                visibleForLoggedUser: true,
                isDivider: false
            },
            {
                visibleForLoggedUser: true,
                isDivider: true
            },
            {
                href: "#",
                isSubHeader: false,
                isActive: false,
                title: "Ranking",
                visibleForLoggedUser: true,
                isDivider: false
            },
            {
                href: "#",
                isSubHeader: false,
                isActive: false,
                title: "Profile",
                visibleForLoggedUser: true,
                isDivider: false
            },
            {
                href: "#",
                isSubHeader: false,
                isActive: false,
                title: "Log out",
                visibleForLoggedUser: true,
                isDivider: false
            }
        ];
    });