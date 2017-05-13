"use strict";

var deadlineApp = angular
    .module("deadline", ["ngRoute", "ngResource"])
    .constant("appSettings",
        {
            apiPath: "http://localhost:59590/"
        })
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix("");
        $routeProvider
            .when("/signUp",
                {
                    templateUrl: "app/components/signUp/signUp.html",
                    controller: "SignUpCtrl"
                })
            .when("/singIn",
                {
                    templateUrl: "app/components/signIn/signIn.html",
                    controller: "SignInCtrl"
                })
            .when("/dashboard",
                {
                    templateUrl: "app/components/dashboard/dashboard.html",
                    controller: "DashboardCtrl"
                })
            .when("/employeesHire",
                {
                    templateUrl: "app/components/employeesHire/employeesHire.html",
                    controller: "EmployeesHireCtrl"
                })
            .when("/employeesManage",
                {
                    templateUrl: "app/components/employeesManage/employeesManage.html",
                    controller: "EmployeesManageCtrl"
                })
            .when("/projectsSearch",
                {
                    templateUrl: "app/components/projectsSearch/projectsSearch.html",
                    controller: "ProjectsSearchCtrl"
                })
            .otherwise(
                {
                    redirectTo: "/dashboard"
                });
    })
    .run(function($rootScope, $location, currentUserFactory, navbarFactory) {
        $rootScope.$on("$locationChangeStart",
            function(event, next) {
                let urlTab = next.split("/").pop();
                let activeTab = navbarFactory.tabs.find(function(tab) {
                    if (tab.href) {
                        return urlTab === tab.href.substring(1);
                    }
                    return false;
                });
                if (activeTab != undefined) {
                    navbarFactory.tabClick(activeTab);
                }
                if (!currentUserFactory.getProfile().isLoggedIn) {
                    if (next.includes("dashboard")) {
                        $location.path("/singIn");
                    }
                }
            });
    });