﻿"use strict";

deadlineApp.controller("NavbarCtrl",
    function($scope, currentUserFactory, navbarFactory, companiesResource, loaderFactory) {

        currentUserFactory.registerObservator(function() {
            $scope.accountBalance = currentUserFactory.getProfile().accountBalance;
            $scope.leftRounds = currentUserFactory.getProfile().leftRounds;
        });

        loaderFactory.registerObservator(function() {
            $scope.webApiCallCount = loaderFactory.getWebApiCallCount();
        });

        $scope.headerTabName = navbarFactory.headerTabName;
        $scope.tabClick = navbarFactory.tabClick;
        $scope.tabs = navbarFactory.tabs;

        $scope.isLoggedIn = function() {
            return currentUserFactory.getProfile().isLoggedIn;
        };

        $scope.nextRound = function() {
            companiesResource.actions().nextRound(
                {},
                function() {
                    currentUserFactory.substractOneRound();
                },
                function() {
                    Materialize.toast("Cannot make next round. Please try again later.", 10000);
                });
        }
    });