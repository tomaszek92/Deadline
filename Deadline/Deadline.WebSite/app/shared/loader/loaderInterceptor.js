"use strict";

deadlineApp.factory("loaderInterceptor",
    function($q, loaderFactory) {
        return {
            request: function(config) {
                loaderFactory.startWebApiCall();
                return config;
            },
            requestError: function(rejection) {
                return $q.reject(rejection);
            },
            response: function(response) {
                loaderFactory.endWebApiCall();
                return response;
            },
            responseError: function(rejection) {
                loaderFactory.endWebApiCall();
                return $q.reject(rejection);
            }
        }
    });