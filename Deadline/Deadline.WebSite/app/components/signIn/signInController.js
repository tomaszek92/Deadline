"use strict";

deadlineApp.controller("signInCtrl",
    function($scope, $location, userAccountResource, currentUser, companiesResource) {
        $scope.email = "";
        $scope.password = "";
        $scope.wrongCredentials = false;
        $scope.singInDisable = false;
        $scope.errorOccurred = false;

        $scope.singIn = function() {
            $scope.singInDisable = true;
            $scope.errorOccurred = false;

            const loginRequestData = {
                grant_type: "password",
                userName: $scope.email,
                password: $scope.password
            };
            userAccountResource.login
                .loginUser(loginRequestData,
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
                                $scope.errorOccurred = true;
                                console.log(getCompanyResponseError);
                            }
                        );
                    },
                    function(loginResponseError) {
                        $scope.errorOccurred = true;
                        console.log(loginResponseError);
                    })
                .$promise.finally(function() {
                    $scope.email = "";
                    $scope.password = "";
                    $scope.wrongCredentials = false;
                    $scope.singInDisable = false;
                });
        }
    });