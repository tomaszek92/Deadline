"use strict";

deadlineApp.filter("employeeExperience",
    function() {
        return function(employeeExperienceId) {
            const experiences = {
                1: "Junior",
                2: "Mid",
                3: "Senior",
                4: "Ninja"
            };
            return experiences[employeeExperienceId];
        };
    });