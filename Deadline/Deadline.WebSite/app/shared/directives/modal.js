"use strict";

deadlineApp.directive("modal",
    function () {
        return {
            restrict: "A",
            link: function (scope, element) {
                $(element[0]).modal();
            }
        }
    });