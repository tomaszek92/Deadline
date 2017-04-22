"use strict";

//deadlineApp.factory("companiesResource",
//    function ($resource, appSettings, currentUser) {
//        return $resource(
//            appSettings.apiPath + "api/companies?email=:email",
//            { email: "@email" },
//            {
//                get: {
//                    headers: {
//                        Authorization: "Bearer " + currentUser.getProfile.token
//                    }
//                }
//            });
//    });


deadlineApp.factory("companiesResource",
    function($resource, appSettings, currentUser) {
        return {
            get: function() {
                return $resource(
                    appSettings.apiPath + "api/companies?email=:email",
                    { email: "@email" },
                    {
                        byEmail: {
                            headers: {
                                Authorization: "Bearer " + currentUser.getProfile().token
                            }
                        }
                    });
            }
        };
    });