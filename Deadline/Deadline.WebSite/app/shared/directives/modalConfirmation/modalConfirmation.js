"use strict";

deadlineApp.directive("modalConfirmation",
    function() {
        return {
            restrict: "E",
            scope: {
                header: "@",
                message: "@",
                agree: "&"
            },
            link: function(scope, element) {
                $(element[0]).modal();
            },
            templateUrl: "app/shared/directives/modalConfirmation/modalConfirmation.html",
            replace: true
        };
    });