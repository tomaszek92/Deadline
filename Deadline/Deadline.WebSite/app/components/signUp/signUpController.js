"use strict";

deadlineApp.controller("signUpCtrl",
    function($scope, userAccountResource, currentUser) {
        $scope.email = "test@test.pl";
        $scope.password = "";
        $scope.passwordConfirm = "";
        $scope.companyName = "";
        $scope.companyLogo = "";
        $scope.messages = [];

        $scope.submit = function() {
            $scope.messages = [];

            const registerUserRequestData = {
                email: $scope.email,
                password: $scope.password,
                confirmPassword: $scope.passwordConfirm,
                companyName: $scope.companyName,
                companyLogo: $scope.companyLogo
            };

            userAccountResource.registration.registerUser(
                registerUserRequestData,
                function(data) {
                    const loginRequestData = {
                        grant_type: "password",
                        userName: $scope.email,
                        password: $scope.password
                    };
                    userAccountResource.login.loginUser(loginRequestData,
                        function() {
                            currentUser.setProfile(
                                loginRequestData.userName,
                                registerUserRequestData.companyName,
                                data.access_token);
                        },
                        function() {

                        });
                },
                function(response) {
                    console.log(response);
                    if (response.data.modelState[""]) {
                        for (var key in response.data.modelState[""]) {
                            $scope.messages.push(response.data.modelState[""][key]);
                        }
                    }
                });
        };
    });