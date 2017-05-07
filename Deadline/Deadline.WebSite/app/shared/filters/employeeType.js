"use strict";

deadlineApp.filter("employeeType",
    function() {
        return function(employeeTypeId) {
            const types = {
                1: "C# Developer",
                2: "SQL Developer",
                3: "Webmaster"
            };
            return types[employeeTypeId];
        };
    });