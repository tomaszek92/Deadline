"use strict";

deadlineApp.factory("employeesResource",
    function() {
        return {
            get: function() {
                return [
                    {
                        id: 1,
                        name: "Jan Kowalski",
                        typeId: 2,
                        experienceId: 2,
                        salary: 200
                    },
                    {
                        id: 2,
                        name: "Tomasz Nowak",
                        typeId: 1,
                        experienceId: 4,
                        salary: 1200
                    },
                    {
                        id: 3,
                        name: "James Hunter",
                        typeId: 2,
                        experienceId: 1,
                        salary: 45
                    },
                    {
                        id: 4,
                        name: "Piotr Graczyk",
                        typeId: 1,
                        experienceId: 3,
                        salary: 400
                    },
                    {
                        id: 5,
                        name: "Thomas Albax",
                        typeId: 2,
                        experienceId: 2,
                        salary: 200
                    },
                    {
                        id: 6,
                        name: "Sven Fusch",
                        typeId: 2,
                        experienceId: 4,
                        salary: 1500
                    }
                ];
            }
        }
    });