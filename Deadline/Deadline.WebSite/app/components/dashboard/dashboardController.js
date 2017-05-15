deadlineApp.controller("DashboardCtrl",
    function($scope, projectsResource) {

        $scope.projectChartOption = {};

        projectsResource
            .getMy()
            .then(
                function(response) {
                    const xAxisCategories = [];
                    const roundsToFinishSeriesData = [];
                    const roundsCompletedSeriesData = [];

                    for (let i = 0; i < response.data.length; i++) {
                        xAxisCategories.push((response.data[i].name));
                        roundsToFinishSeriesData.push(response.data[i].roundsToFinish);
                        roundsCompletedSeriesData.push(response.data[i].rounds - response.data[i].roundsToFinish);
                    }

                    $scope.projectChartOption =
                        createProjectChartOption(xAxisCategories, roundsToFinishSeriesData, roundsCompletedSeriesData);
                },
                function() {
                    Materialize.toast("Cannot load project details. Please try again later.", 10000);
                });

        function createProjectChartOption(xAxisCategories, roundsToFinishSeriesData, roundsCompletedSeriesData) {
            return {
                chart: {
                    type: "bar"
                },
                title: {
                    text: null
                },
                xAxis: {
                    categories: xAxisCategories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: "Rounds to finish",
                        align: "high"
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        stacking: "normal"
                    }
                },
                series: [
                    {
                        name: "Rounds to finish",
                        data: roundsToFinishSeriesData
                    },
                    {
                        name: "Rounds completed",
                        data: roundsCompletedSeriesData
                    }
                ]
            };
        }
    });