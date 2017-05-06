deadlineApp.directive("pagination",
    function() {
        return {
            restrict: "E",
            scope: {
                getData: "&",
                pages: "="
            },
            templateUrl: "app/shared/directives/pagination/pagination.html",
            replace: true,
            controller: function ($scope) {
                $scope.activePage = 1;
                $scope.change = function (move) {
                    $scope.activePage = $scope.activePage + move;
                    $scope.getData();
                };
                $scope.set = function (page) {
                    $scope.activePage = page;
                    console.log($scope.activePage);
                    $scope.getData({ activePage: $scope.activePage });
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