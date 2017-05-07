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
            $scope.actualProject = project;
            $("#projectDetailsModal").modal("open");

            projectsResource
                .getProjectRequirements(project.id)
                .then(
                    function(response) {
                        $scope.actualProject.requirements = response.data;
                    },
                    function() {
                        Materialize.toast("Cannot load project details. Please try again later.", 10000);
                    });
        };

        $scope.takeUp = function(projectId) {
            projectsResource
                .takeUp(projectId)
                .then(
                    function() {
                        Materialize.toast("You have taken up a new project.", 10000);
                    },
                    function() {
                        Materialize.toast("Cannot take up project. Please try again later.", 10000);
                    })
                .finally(function() {
                    $scope.projects.removeById(projectId);
                });
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
                    function() {
                        Materialize.toast("Cannot load projects. Please try again later.", 10000);
                    });
        }
    });