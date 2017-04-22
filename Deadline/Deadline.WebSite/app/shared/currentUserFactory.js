"use strict";

deadlineApp.factory("currentUser",
    function() {
        var profile = {
            isLoggedIn: false,
            username: "",
            companyName: "",
            token: ""
        };

        var setProfile = function(username, companyName, token) {
            profile.username = username;
            profile.companyName = companyName;
            profile.token = token;
            profile.isLoggedIn = true;
        };

        var getProfile = function() {
            return profile;
        }

        var clearProfile = function() {
            profile.username = "";
            profile.companyName = "";
            profile.token = "";
            profile.isLoggedIn = false;
        }

        return {
            setProfile: setProfile,
            getProfile: getProfile,
            clearProfile: clearProfile
        };
    });