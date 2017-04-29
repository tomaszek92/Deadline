"use strict";

deadlineApp.factory("companiesResource",
    function($resource, appSettings, currentUserFactory) {
        return {
            get: function() {
                return $resource(
                    appSettings.apiPath + "api/companies/:userId",
                    { userId: "@userId" },
                    {
                        byUserId: {
                            headers: {
                                Authorization: "Bearer " + currentUserFactory.getProfile().token
                            }
                        }
                    });
            }
        };
    });