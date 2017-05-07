"use strict";

deadlineApp.factory("currentUserFactory",
    function() {
        var profile = {
            isLoggedIn: false,
            username: "",
            companyName: "",
            token: "",
            userId: "",
            companyId: -1
        };

        var setToken = function(token) {
            profile.token = token;
        }

        var setProfile = function(username, companyName, userId, companyId) {
            profile.username = username;
            profile.companyName = companyName;
            profile.isLoggedIn = true;
            profile.userId = userId;
            profile.companyId = companyId;
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