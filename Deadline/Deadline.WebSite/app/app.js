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
                    controller: "signUpCtrl"
                })
            .when("/singIn",
                {
                    templateUrl: "app/components/signIn/signIn.html",
                    controller: "signInCtrl"
                })
            .when("/dashboard",
                {
                    templateUrl: "app/components/dashboard/dashboard.html",
                    controller: "dashboardCtrl"
                })
            .when("/employeesHire",
                {
                    templateUrl: "app/components/employeesHire/employeesHire.html",
                    controller: "employeesHireCtrl"
                });
    });