"use strict";

deadlineApp.controller("signUpCtrl",
    function($scope, userAccount) {
        $scope.email = "test@test.pl";
        $scope.password = "";
        $scope.passwordConfirm = "";
        $scope.companyName = "";
        $scope.companyLogo = "";

        $scope.submit = function() {
            const requestData = {
                email: $scope.email,
                password: $scope.password,
                confirmPassword: $scope.passwordConfirm,
                companyName: $scope.companyName,
                companyLogo: $scope.companyLogo
            };
            userAccount.registration.registerUser(
                requestData,
                function(data) {
                    console.log(data);
                },
                function(response) {
                    console.log(response);
                });
        };
    });