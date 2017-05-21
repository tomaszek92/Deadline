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
                    url: appSettings.apiPath + "api/employees/unemployeed",
                    headers: {
                        Authorization: "Bearer " + currentUserFactory.getProfile().token
                    }
                },
                getMy: {
                    url: appSettings.apiPath + "api/employees/:companyId/:assigned/:pageNumber",
                    headers: {
                        Authorization: "Bearer " + currentUserFactory.getProfile().token
                    }
                },
                getMyAmount: {
                    url: appSettings.apiPath + "api/employees/:companyId/amount",
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