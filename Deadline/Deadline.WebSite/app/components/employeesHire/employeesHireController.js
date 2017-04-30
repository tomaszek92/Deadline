"use strict";

deadlineApp.controller("EmployeesHireCtrl",
    function ($scope, employeesResource) {
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

        $scope.search = function() {
            alert("search");
        };

        $scope.employeesToHire = employeesResource.get();

        $scope.hire = function(employeeId) {
            alert("EmployeeId: " + employeeId);
        }

        $scope.pagination = {
            change: function() {
                alert("change");
            },
            set: function() {
                alert("set");
            },
            pages: [1, 2, 3, 4, 5],
            activePage: 1
        };

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
    });