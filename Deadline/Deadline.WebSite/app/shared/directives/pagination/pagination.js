deadlineApp.directive("pagination",
    function() {
        return {
            restrict: "E",
            scope: {
                getData: "&",
                pages: "=",
                activePage: "="
            },
            templateUrl: "app/shared/directives/pagination/pagination.html",
            replace: true,
            controller: function ($scope) {
                $scope.change = function (move) {
                    $scope.activePage = $scope.activePage + move;
                    $scope.getData();
                };
                $scope.set = function (page) {
                    $scope.activePage = page;
                    $scope.getData();
                };
                $scope.leftArrowDisabled = function() {
                    return $scope.activePage === 1;
                };
                $scope.rightArrowDisabled = function() {
                    return $scope.activePage === $scope.pages.last();
                };
            }
        }
    })