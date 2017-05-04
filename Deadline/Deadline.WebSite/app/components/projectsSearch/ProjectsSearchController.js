"use strict";

deadlineApp.controller("ProjectsSearchCtrl",
    function($scope, projectsResource) {
        $scope.searchCriteria = {
            roundsToFinish: {
                min: 5,
                max: 90
            }
        };

        $scope.search = function() {

        };

        $scope.projects = [];

        projectsResource
            .getUnassigned(1, $scope.searchCriteria.roundsToFinish)
            .then(
                function(response) {
                    $scope.projects = response.data.projects;
                    console.log(response);
                },
                function(response) {
                    console.log(response);
                });

        $scope.showDetails = function(project) {
            console.log(angular.toJson(project));
        };

        $scope.takeUp = function(projectId) {
            console.log(projectId);
        };
    });