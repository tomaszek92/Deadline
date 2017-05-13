"use strict";

deadlineApp.controller("EmployeesManageCtrl",
    function($scope, $q, employeesResource, projectsResource, paginationFactory) {

        $scope.pagination = paginationFactory.createEmptyPages();

        $scope.searchCriteria = {
            assigned: true
        };

        $scope.search = function() {
            getMy(1);
        }

        $scope.assign = function(employee) {
            employeesResource.assign(
                {
                    employeeId: employee.id,
                    projectId: employee.projectId
                },
                function() {
                    Materialize.toast("You have assigned employee to new project.", 3000);
                },
                function() {
                    Materialize.toast("Something went wrong. Please try again.", 3000);
                });
        }

        $scope.fire = function(employeeId) {
            employeesResource.fire(
                {
                    employeeId: employeeId
                },
                function () {
                    $scope.employees.removeById(employeeId);
                    Materialize.toast("You have fired employee.", 3000);
                },
                function() {
                    Materialize.toast("Something went wrong. Please try again.", 3000);
                });
        }

        $scope.employees = [];
        $scope.projects = [];

        $scope.getMy = function(activePage) {
            getMy(activePage);
        };

        getMy(1);

        function getMy(activePage) {
            const getMyEmployees = employeesResource
                .getMy({
                    assigned: $scope.searchCriteria.assigned,
                    pageNumber: activePage
                })
                .$promise;

            const getMyProjects = projectsResource.getMy();

            $q.all([getMyEmployees, getMyProjects])
                .then(
                    function(response) {
                        $scope.employees = response[0].employeesWithProject;
                        $scope.projects = response[1].data;

                        paginationFactory.fillPages($scope.pagination.pages, response[0].numberOfPages);
                    },
                    function(response) {
                        console.log(response);
                    });
        }
    });