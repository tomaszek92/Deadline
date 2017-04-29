"use strict";

deadlineApp.factory("currentUserFactory",
    function() {
        var profile = {
            isLoggedIn: false,
            username: "",
            companyName: "",
            token: "",
            userId: ""
        };

        var setToken = function(token) {
            profile.token = token;
        }

        var setProfile = function(username, companyName, userId) {
            profile.username = username;
            profile.companyName = companyName;
            profile.isLoggedIn = true;
            profile.userId = userId;
        };

        var getProfile = function() {
            return profile;
        }

        var clearProfile = function() {
            profile.username = "";
            profile.companyName = "";
            profile.token = "";
            profile.isLoggedIn = false;
            profile.userId = "";
        }

        return {
            setToken: setToken,
            setProfile: setProfile,
            getProfile: getProfile,
            clearProfile: clearProfile
        };
    });