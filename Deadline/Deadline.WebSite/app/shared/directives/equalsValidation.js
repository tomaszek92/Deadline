"use strict";

deadlineApp.directive("equalsValidation",
    function() {
        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope, elem, attrs, ngModel) {
                var validate = function() {
                    const val1 = ngModel.$viewValue;
                    const val2 = attrs.equalsValidation;
                    const isValid = !val1 || !val2 || val1 === val2;
                    ngModel.$setValidity("equals", isValid);
                    if (val1) {
                        if (isValid) {
                            elem.removeClass("invalid").addClass("valid");
                        } else {
                            elem.removeClass("valid").addClass("invalid");
                        }
                    } else {
                        elem.removeClass("valid").removeClass("invalid");
                    }
                };

                elem.bind("blur", validate);

                scope.$watch(attrs.ngModel,
                    function() {
                        validate();
                    });

                attrs.$observe("equalsValidation",
                    function(val) {
                        validate();
                    });
            }
        }
    });