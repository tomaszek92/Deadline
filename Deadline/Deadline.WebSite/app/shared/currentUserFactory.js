"use strict";

deadlineApp.factory("currentUser",
    function() {
        var profile = {
            isLoggedIn: false,
            username: "",
            token: ""
        };

        var setProfile = function(username, token) {
            profile.username = username;
            profile.token = token;
            profile.isLoggedIn = true;
        };

        var getProfile = function() {
            return profile;
        }

        return {
            setProfile: setProfile,
            getProfile: getProfile
        };
    });