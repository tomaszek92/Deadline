"use strict";

deadlineApp.factory("currentUserFactory",
    function () {
        var observators = [];

        var registerObservator = function(callback) {
            observators.push(callback);
        }

        var notifyObserbators = function() {
            angular.forEach(observators,
                function(observator) {
                    observator();
                });
        }

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

        var substractOneRound = function() {
            profile.leftRounds--;
            notifyObserbators();
        }

        var substractFromAccountBalance = function(moneyAmount) {
            profile.accountBalance -= moneyAmount;
            notifyObserbators();
        }

        var setProfile = function(username, companyName, userId, companyId, accountBalance, leftRounds) {
            profile.username = username;
            profile.companyName = companyName;
            profile.isLoggedIn = true;
            profile.userId = userId;
            profile.companyId = companyId;
            profile.accountBalance = accountBalance;
            profile.leftRounds = leftRounds;

            notifyObserbators();
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
            clearProfile: clearProfile,
            registerObservator: registerObservator,
            substractOneRound: substractOneRound,
            substractFromAccountBalance: substractFromAccountBalance
    };
});