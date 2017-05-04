deadlineApp.directive("noUiSlider",
    function() {
        return {
            restrict: "A",
            scope: {
                min: "=",
                max: "="
            },
            link: function (scope, element) {
                noUiSlider.create(element[0],
                    {
                        start: [scope.min, scope.max],
                        connect: true,
                        step: 1,
                        range: {
                            min: 0,
                            max: 100
                        },
                        format: wNumb({
                            decimals: 0
                        })
                    });

                element[0].noUiSlider.on("change",
                    function(values) {
                        [scope.min, scope.max] = values;
                        scope.$apply();
                    });
            }
        }
    });