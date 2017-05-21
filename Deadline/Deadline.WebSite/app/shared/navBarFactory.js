deadlineApp.factory("navbarFactory",
    function(currentUserFactory) {
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
                href: "#employeesManage",
                isSubHeader: false,
                isActive: false,
                title: "Manage",
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
                href: "#projectsSearch",
                isSubHeader: false,
                isActive: false,
                title: "Search",
                visibleForLoggedUser: true,
                isDivider: false
            },
            {
                href: "#projectsManage",
                isSubHeader: false,
                isChildren: true,
                title: "Manage",
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

        var headerTabName;

        var tabClick = function(tab) {
            headerTabName = tab.title;

            for (let i = 0; i < tabs.length; i++) {
                tabs[i].isActive = false;
            }
            if (tab.title === "Log out") {
                currentUserFactory.clearProfile();
            } else {
                tab.isActive = true;
            }
        }

        return {
            headerTabName: headerTabName,
            tabClick: tabClick,
            tabs: tabs
        }
    });