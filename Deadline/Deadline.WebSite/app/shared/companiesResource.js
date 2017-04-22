"use strict";

deadlineApp.factory("companiesResource",
    function($resource, appSettings, currentUser) {
        return {
            get: function() {
                return $resource(
                    appSettings.apiPath + "api/companies/:userId",
                    { userId: "@userId" },
                    {
                        byUserId: {
                            headers: {
                                Authorization: "Bearer " + currentUser.getProfile().token
                            }
                        }
                    });
            }
        };
    });