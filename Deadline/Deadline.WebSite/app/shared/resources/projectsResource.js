"use strict";

deadlineApp.factory("projectsResource",
    function($http, appSettings, currentUserFactory) {
        return {
            getUnassigned: function(pageNumber, roundsToFinish) {
                return $http({
                    method: "GET",
                    url: appSettings.apiPath + "api/Projects/GetUnassigned",
                    params: {
                        pageNumber: pageNumber,
                        roundsToFinishMin: roundsToFinish.min,
                        roundsToFinishMax: roundsToFinish.max
                    },
                    headers: {
                        Authorization: "Bearer " + currentUserFactory.getProfile().token
                    }
                });
            },
            getProjectRequirements: function(projectId) {
                return $http.get(
                    appSettings.apiPath + "api/Projects/GetProjectRequirements",
                    {
                        params: {
                            projectId: projectId
                        },
                        headers: {
                            Authorization: "Bearer " + currentUserFactory.getProfile().token
                        }
                    });
            },
            getMy: function() {
                return $http.get(
                    appSettings.apiPath + "api/Projects/GetMy",
                    {
                        params: {
                            companyId: currentUserFactory.getProfile().companyId
                        },
                        headers: {
                            Authorization: "Bearer " + currentUserFactory.getProfile().token
                        }
                    }
                );
            },
            takeUp: function(projectId) {
                return $http({
                    method: "PUT",
                    url: appSettings.apiPath + "api/Projects/TakeUp",
                    params: {
                        companyId: currentUserFactory.getProfile().companyId,
                        projectId: projectId
                    },
                    headers: {
                        Authorization: "Bearer " + currentUserFactory.getProfile().token
                    }
                });
            }
        }
    });