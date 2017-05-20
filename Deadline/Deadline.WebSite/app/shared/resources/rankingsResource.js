"use strict";

deadlineApp.factory("rankingsResource",
    function($resource, appSettings, currentUserFactory) {
        return $resource(
            appSettings.apiPath + "api/rankings/:companyId/:rankingPeriod",
            {
                companyId: currentUserFactory.getProfile().companyId,
                rankingPeriod: "@rankingPeriod"
            },
            {
                getPosition: {
                    headers: {
                        Authorization: "Bearer " + currentUserFactory.getProfile().token
                    }
                }
            });
    });