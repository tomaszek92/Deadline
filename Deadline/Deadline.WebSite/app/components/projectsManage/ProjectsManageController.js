"use strict";

deadlineApp.controller("ProjectsManageCtrl",
    function($scope, projectsResource, paginationFactory) {

        $scope.pagination = paginationFactory.createEmptyPages();

        $scope.projects = [];

        $scope.showDetails = function(project) {
            $scope.actualProject = project;
            $("#projectDetailsModal").modal("open");

            projectsResource
                .getProjectRequirementsWithAssignedEmployees(project.id)
                .then(
                    function(response) {
                        $scope.actualProject.requirements = response.data;
                    },
                    function() {
                        Materialize.toast("Cannot load project details. Please try again later.", 10000);
                    });
        }

        $scope.turnDown = function(project) {
            $scope.actualProject = project;
            $("#confirmationModal").modal("open");
        }

        $scope.turnDownAgree = function() {
            projectsResource
                .turnDown($scope.actualProject.id)
                .then(
                    function() {
                        $scope.projects.removeById($scope.actualProject.id);
                        showToast("You have turned down a project.");
                    },
                    function() {
                        showToast("Cannot turn down projects.");
                    });
        }

        $scope.getMy = function(activePage) {
            getMy(activePage);
        }

        getMy(1);

        function getMy(page) {
            projectsResource
                .getMyByFilter(page)
                .then(
                    function(response) {
                        $scope.projects = response.data.projects;
                        paginationFactory.fillPages($scope.pagination.pages, response.data.numberOfPages);
                    },
                    function() {
                        showToast("Cannot load projects.");
                    });
        }
    });