"use strict";

deadlineApp.factory("loaderFactory",
    function () {
        var observators = [];
        var webApiCallCount = 0;

        function registerObservator(callback) {
            observators.push(callback);
        }

        function notifyObservators() {
            angular.forEach(observators,
                function (observator) {
                    observator();
                });
        }


        function getWebApiCallCount() {
            return webApiCallCount;
        }

        function startWebApiCall() {
            webApiCallCount++;
            notifyObservators();
        }

        function endWebApiCall() {
            webApiCallCount--;
            notifyObservators();
        }

        return {
            getWebApiCallCount: getWebApiCallCount,
            startWebApiCall: startWebApiCall,
            endWebApiCall: endWebApiCall,
            registerObservator: registerObservator
        }
    });