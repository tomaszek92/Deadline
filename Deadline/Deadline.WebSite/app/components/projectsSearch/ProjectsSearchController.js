"use strict";

deadlineApp.controller("ProjectsSearchCtrl",
    function($scope, projectsResource, paginationFactory) {
        $scope.searchCriteria = {
            roundsToFinish: {
                min: 5,
                max: 90
            }
        };

        $scope.pagination = paginationFactory.createEmptyPages();

        $scope.projects = [];

        $scope.search = function() {
            getUnassigned(1);
        };

        $scope.getUnassigned = function(activePage) {
            getUnassigned(activePage);
        }

        $scope.showDetails = function(project) {
            console.log(angular.toJson(project));
        };

        $scope.takeUp = function(projectId) {
            console.log(projectId);
        };

        getUnassigned(1);

        function getUnassigned(activePage) {
            projectsResource
                .getUnassigned(activePage, $scope.searchCriteria.roundsToFinish)
                .then(
                    function(response) {
                        $scope.projects = response.data.projects;
                        paginationFactory.fillPages($scope.pagination.pages, response.data.numberOfPages);
                    },
                    function(response) {
                        Materialize.toast("Cannot load projects. Please try again later.", 10000);
                    });
        }
    });