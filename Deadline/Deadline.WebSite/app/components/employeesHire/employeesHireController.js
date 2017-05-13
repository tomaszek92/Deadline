"use strict";

deadlineApp.controller("EmployeesHireCtrl",
    function($scope, employeesResource, paginationFactory) {
        $scope.types = {
            1: {
                selected: true,
                name: "C# Developer"
            },
            2: {
                selected: true,
                name: "SQL Developer"
            },
            3: {
                selected: true,
                name: "Webmaster"
            }
        };

        $scope.experiences = {
            1: {
                selected: true,
                name: "Junior"
            },
            2: {
                selected: true,
                name: "Mid"
            },
            3: {
                selected: true,
                name: "Senior"
            },
            4: {
                selected: true,
                name: "Ninja"
            }
        };

        $scope.searchIsDisabled = function() {
            const experienceIsSelected = isSelected($scope.experiences);
            const typeIsSelected = isSelected($scope.types);
            return !experienceIsSelected || !typeIsSelected;
        };

        $scope.pagination = paginationFactory.createEmptyPages();

        $scope.search = function() {
            getUnemployed(1);
        };

        $scope.getUnemployed = function(activePage) {
            getUnemployed(activePage);
        };

        getUnemployed(1);

        $scope.hire = function(employeeId) {
            employeesResource
                .hire(
                    { employeeId: employeeId },
                    function() {
                        Materialize.toast("Your company has hired new employee", 3000);
                    },
                    function() {
                        Materialize.toast("Something went wrong. Please try again.", 3000);
                    })
                .$promise.finally(function() {
                    $scope.employeesToHire.removeById(employeeId);
                });
        }

        function getSelectedIds(array) {
            const ids = [];
            for (let id in array) {
                if (array[id].selected) {
                    ids.push(id);
                }
            }
            return ids;
        }

        function isSelected(array) {
            return getSelectedIds(array).length > 0;
        }

        function getUnemployed(activePage) {
            employeesResource.getUnemployed(
                {
                    typesIds: getSelectedIds($scope.types),
                    experienceIds: getSelectedIds($scope.experiences),
                    pageNumber: activePage
                },
                function(response) {
                    $scope.employeesToHire = response.employees;
                    paginationFactory.fillPages($scope.pagination.pages, response.numberOfPages);
                },
                function(response) {
                    Materialize.toast("Cannot load employees. " + response.data.message, 10000);
                });
        }
    });