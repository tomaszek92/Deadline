deadlineApp.factory("navBar",
    function (currentUser) {
        var tabs = [
            {
                href: "#singIn",
                isSubHeader: false,
                isActive: false,
                title: "Sign in",
                visibleForLoggedUser: false,
                isDivider: false
            },
            {
                href: "#signUp",
                isSubHeader: false,
                isActive: false,
                title: "Sign up",
                visibleForLoggedUser: false,
                isDivider: false
            },
            {
                href: "#dashboard",
                isSubHeader: false,
                isActive: false,
                title: "Dashboard",
                visibleForLoggedUser: true,
                isDivider: false
            },
            {
                href: "#",
                isSubHeader: true,
                isActive: false,
                title: "Employees",
                visibleForLoggedUser: true,
                icon: "contacts",
                isDivider: false
            },
            {
                href: "#employeesHire",
                isSubHeader: false,
                isActive: false,
                title: "Hire",
                visibleForLoggedUser: true,
                isDivider: false
            },
            {
                href: "#",
                isSubHeader: false,
                isActive: false,
                title: "Own",
                visibleForLoggedUser: true,
                isDivider: false
            },
            {
                visibleForLoggedUser: true,
                isDivider: true
            },
            {
                href: "#",
                isSubHeader: true,
                isActive: false,
                title: "Projects",
                visibleForLoggedUser: true,
                icon: "shopping_basket",
                isDivider: false
            },
            {
                href: "#",
                isSubHeader: false,
                isActive: false,
                title: "Search",
                visibleForLoggedUser: true,
                isDivider: false
            },
            {
                href: "#",
                isSubHeader: false,
                isChildren: true,
                title: "Own",
                visibleForLoggedUser: true,
                isDivider: false
            },
            {
                visibleForLoggedUser: true,
                isDivider: true
            },
            {
                href: "#",
                isSubHeader: false,
                isActive: false,
                title: "Ranking",
                visibleForLoggedUser: true,
                isDivider: false
            },
            {
                href: "#",
                isSubHeader: false,
                isActive: false,
                title: "Profile",
                visibleForLoggedUser: true,
                isDivider: false
            },
            {
                href: "#",
                isSubHeader: false,
                isActive: false,
                title: "Log out",
                visibleForLoggedUser: true,
                isDivider: false
            }
        ];

        var pageTitle;

        var tabClick = function (tab) {
            pageTitle = tab.title;
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].isActive = false;
            }
            if (tab.title === "Log out") {
                currentUser.clearProfile();
            } else {
                tab.isActive = true;
            }
        }

        return {
            pageTitle: pageTitle,
            tabClick: tabClick,
            tabs: tabs
        }
    });