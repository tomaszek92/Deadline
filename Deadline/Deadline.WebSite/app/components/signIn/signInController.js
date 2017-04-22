"use strict";

deadlineApp.controller("signInCtrl",
    function($scope, $location, userAccountResource, currentUser, companiesResource) {
        $scope.email = "";
        $scope.password = "";
        $scope.wrongCredentials = false;

        $scope.singIn = function() {
            const loginRequestData = {
                grant_type: "password",
                userName: $scope.email,
                password: $scope.password
            };
            userAccountResource.login.loginUser(loginRequestData,
                function(data) {
                    $scope.email = "";
                    $scope.password = "";
                    $scope.wrongCredentials = false;
                    currentUser.setProfile(loginRequestData.userName, "", data.access_token);

                    companiesResource.get().byEmail(
                        { email: loginRequestData.userName },
                        function(data) {
                            console.log(data);
                            //$location.path("dashboard");
                        },
                        function(response) {
                            console.log(response);
                        }
                    );
                },
                function(response) {
                    $scope.email = "";
                    $scope.password = "";
                    $scope.wrongCredentials = true;
                });
        }
    });