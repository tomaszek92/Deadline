"use strict";

deadlineApp.factory("employeesResource",
    function($resource, appSettings, currentUserFactory) {
        return $resource(
            appSettings.apiPath + "api/employees",
            {
                companyId: currentUserFactory.getProfile().companyId,
                employeeId: "@employeeId"
            },
            {
                getUnemployed: {
                    headers: {
                        Authorization: "Bearer " + currentUserFactory.getProfile().token
                    }
                },
                hire: {
                    url: appSettings.apiPath + "api/employees/:companyId/hires/:employeeId",
                    headers: {
                        Authorization: "Bearer " + currentUserFactory.getProfile().token
                    },
                    method: "PUT"
                }
            });
    });