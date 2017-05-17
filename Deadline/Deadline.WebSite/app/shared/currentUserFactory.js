"use strict";

deadlineApp.factory("currentUserFactory",
    function() {
        var profile = {
            isLoggedIn: false,
            username: "",
            companyName: "",
            token: "",
            userId: -1,
            companyId: -1,
            accountBalance: 0,
            leftRounds: 0
        };

        var setToken = function(token) {
            profile.token = token;
        }

        var setProfile = function(username, companyName, userId, companyId, accountBalance, leftRounds) {
            profile.username = username;
            profile.companyName = companyName;
            profile.isLoggedIn = true;
            profile.userId = userId;
            profile.companyId = companyId;
            profile.accountBalance = accountBalance;
            profile.leftRounds = leftRounds;
        };

        var getProfile = function() {
            return profile;
        }

        var clearProfile = function() {
            profile.username = "";
            profile.companyName = "";
            profile.token = "";
            profile.isLoggedIn = false;
            profile.userId = -1;
            profile.companyId = -1;
            profile.accountBalance = 0;
            profile.leftRounds = 0;
        }

        return {
            setToken: setToken,
            setProfile: setProfile,
            getProfile: getProfile,
            clearProfile: clearProfile
        };
    });