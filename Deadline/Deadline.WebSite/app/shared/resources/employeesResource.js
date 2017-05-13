"use strict";

deadlineApp.factory("employeesResource",
    function($resource, appSettings, currentUserFactory) {
        return $resource(
            appSettings.apiPath + "api/employees",
            {
                companyId: currentUserFactory.getProfile().companyId,
                employeeId: "@employeeId",
                projectId: "@projectId"
            },
            {
                getUnemployed: {
                    headers: {
                        Authorization: "Bearer " + currentUserFactory.getProfile().token
                    }
                },
                getMy: {
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
                },
                assign: {
                    url: appSettings.apiPath + "api/employees/:employeeId/:companyId/assignes/:projectId",
                    headers: {
                        Authorization: "Bearer " + currentUserFactory.getProfile().token
                    },
                    method: "PUT"
                },
                fire: {
                    url: appSettings.apiPath + "api/employees/:companyId/fires/:employeeId",
                    headers: {
                        Authorization: "Bearer " + currentUserFactory.getProfile().token
                    },
                    method: "PUT"
                }
            });
    });