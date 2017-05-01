﻿"use strict";

deadlineApp.controller("EmployeesHireCtrl",
    function($scope, employeesResource) {
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
            $scope.pagination.activePage = 1;
            getUnemployed();
        };

        $scope.pagination = {
            change: function(move) {
                this.activePage = this.activePage + move;
                getUnemployed();
            },
            set: function(page) {
                this.activePage = page;
                getUnemployed();
            },
            leftArrowDisabled: function() {
                return this.activePage === 1;
            },
            rightArrowDisabled: function() {
                return this.activePage === this.pages.last();
            },
            pages: [],
            activePage: 1
        };

        getUnemployed();

        $scope.hire = function(employeeId) {
            employeesResource.hire(
                { employeeId: employeeId },
                function() {
                    Materialize.toast("Your company hired new employee", 3000);
                    getUnemployed();
                },
                function() {
                    Materialize.toast("Something went wrong. Please try again.", 3000);
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

        function getUnemployed() {
            employeesResource.getUnemployed(
                {
                    typesIds: getSelectedIds($scope.types),
                    experienceIds: getSelectedIds($scope.experiences),
                    pageNumber: $scope.pagination.activePage
                },
                function(response) {
                    $scope.employeesToHire = response.employees;
                    $scope.pagination.pages = [];
                    for (let i = 1; i <= response.pageNumbers; i++) {
                        $scope.pagination.pages.push(i);
                    }
                },
                function(response) {
                    console.log(response);
                    Materialize.toast("Cannot load employees. " + response.data.message, 10000);
                });
        }
    });