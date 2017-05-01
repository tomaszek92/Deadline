"use strict";

deadlineApp.controller("SignInCtrl",
    function($scope, $location, userAccountResource, currentUserFactory, companiesResource) {
        $scope.email = "";
        $scope.password = "";
        $scope.wrongCredentials = false;
        $scope.singInDisable = false;

        $scope.singIn = function() {
            $scope.singInDisable = true;

            const loginRequestData = {
                grant_type: "password",
                userName: $scope.email,
                password: $scope.password
            };
            userAccountResource.login
                .loginUser(loginRequestData,
                    function(loginResponse) {
                        currentUserFactory.setToken(loginResponse.access_token);

                        companiesResource.get().byUserId(
                            { userId: loginResponse.userId },
                            function(getCompanyResponse) {
                                currentUserFactory.setProfile(
                                    loginRequestData.userName,
                                    getCompanyResponse.name,
                                    getCompanyResponse.userId,
                                    getCompanyResponse.id);
                                $scope.wrongCredentials = false;
                                $location.path("dashboard");
                            },
                            function(getCompanyResponseError) {
                                $scope.wrongCredentials = true;
                                console.log(getCompanyResponseError);
                            }
                        );
                    },
                    function(loginResponseError) {
                        $scope.wrongCredentials = true;
                        console.log(loginResponseError);
                    })
                .$promise.finally(function() {
                    $scope.email = "";
                    $scope.password = "";
                    $scope.singInDisable = false;
                });
        }
    });