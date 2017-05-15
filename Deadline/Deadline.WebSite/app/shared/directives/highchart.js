"use strict";

deadlineApp.directive("highchart",
    function() {
        return {
            restrict: "E",
            template: "<div></div>",
            replace: true,
            scope: {
                options: "@"
            },
            link: function (scope, element) {
                scope.$watch("options",
                    function () {
                        Highcharts.chart(element[0], angular.fromJson(scope.options));
                    });
            }
        };
    });