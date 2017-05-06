"use strict";

deadlineApp.factory("paginationFactory",
    function() {
        return {
            createEmptyPages: function() {
                return {
                    pages: []
                };
            },
            fillPages: function(pages, numberOfPages) {
                pages.length = 0;
                for (let i = 1; i <= numberOfPages; i++) {
                    pages.push(i);
                }
            }
        }
    });