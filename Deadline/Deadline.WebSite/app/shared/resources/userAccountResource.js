deadlineApp.factory("userAccountResource",
    function($resource, appSettings) {
        return {
            registration: $resource(
                appSettings.apiPath + "api/Account/Register",
                null,
                {
                    "registerUser": { method: "POST" }
                }),
            login: $resource(
                appSettings.apiPath + "/Token",
                null,
                {
                    "loginUser": {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        transformRequest: function(data, headersGetter) {
                            let str = [];
                            for (let d in data) {
                                str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                            }
                            return str.join("&");
                        }
                    }
                })
        };
    });