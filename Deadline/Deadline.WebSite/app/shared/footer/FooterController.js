"use strict";

deadlineApp.controller("FooterCtrl",
    function($scope) {
        $scope.actualYear = new Date().getFullYear();
    });