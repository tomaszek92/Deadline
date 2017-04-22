"use strict";

deadlineApp.controller("signUpCtrl",
    function($scope, userAccountResource, currentUser, companiesResource) {
        $scope.email = "test@test.pl";
        $scope.password = "";
        $scope.passwordConfirm = "";
        $scope.companyName = "";
        $scope.companyLogo = "";
        $scope.messages = [];
        $scope.submitDisable = false;
        $scope.errorOccurred = false;

        $scope.submit = function() {
            $scope.submitDisable = true;
            $scope.messages = [];
            $scope.errorOccurred = false;

            const registerUserRequestData = {
                email: $scope.email,
                password: $scope.password,
                confirmPassword: $scope.passwordConfirm,
                companyName: $scope.companyName,
                companyLogo: $scope.companyLogo
            };
            userAccountResource.registration
                .registerUser(
                    registerUserRequestData,
                    function(registerResponse) {
                        const loginRequestData = {
                            grant_type: "password",
                            userName: $scope.email,
                            password: $scope.password
                        };
                        userAccountResource.login.loginUser(loginRequestData,
                            function(loginResponse) {
                                currentUser.setToken(loginResponse.access_token);

                                companiesResource.get().byUserId(
                                    { userId: loginResponse.userId },
                                    function(getCompanyResponse) {
                                        currentUser.setProfile(
                                            loginRequestData.userName,
                                            getCompanyResponse.name,
                                            getCompanyResponse.userId);
                                        $location.path("dashboard");
                                    },
                                    function(getCompanyResponseError) {
                                        console.log(getCompanyResponseError);
                                        $scope.errorOccurred = true;
                                        $scope.submitDisable = false;
                                    }
                                );
                            },
                            function(loginReposenError) {
                                console.log(loginReposenError);
                                $scope.errorOccurred = true;
                                $scope.submitDisable = false;
                            });
                    },
                    function(registerResponseError) {
                        $scope.submitDisable = false;
                        $scope.errorOccurred = true;

                        if (registerResponseError.data.modelState[""]) {
                            for (var key in registerResponseError.data.modelState[""]) {
                                $scope.messages.push(registerResponseError.data.modelState[""][key]);
                            }
                        }
                    })
                .$promise.finally(function() {
                    $scope.email = "";
                    $scope.password = "";
                    $scope.passwordConfirm = "";
                    $scope.companyName = "";
                    $scope.companyLogo = "";
                    $scope.messages = [];
                    $scope.submitDisable = false;
                });
        };
    });