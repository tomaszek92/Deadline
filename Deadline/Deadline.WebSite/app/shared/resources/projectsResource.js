﻿"use strict";

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
            }
        }
    });