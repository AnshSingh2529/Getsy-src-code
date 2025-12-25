import {
  Briefcase,
  LucideMapPinHouse,
  PercentDiamond,
  User,
  Users,
} from "lucide-react"; // add this since Hire Agent uses it

function getBottomNavItems(user, toggleProfile) {
  const common = [
    {
      path: "/",
      icon: LucideMapPinHouse,
      label: "Search",
      exact: true,
    },
    {
      path: "/g-prime",
      icon: PercentDiamond,
      label: "GPrime",
      exact: false,
    },
    {
      path: user ? "/profile" : "/auth/login",
      icon: User,
      label: user ? "Profile" : "Login",
      exact: false,
      action: user ? toggleProfile : null,
    },
  ];

  if (!user) {
    // Guest (not logged in)
    return [
      ...common,
      {
        path: "/hire-agents",
        icon: Briefcase,
        label: "Hire Agent",
        exact: false,
      },
    ];
  }

  switch (user.role) {
    case "AGENT":
      return [
        {
          path: "/agent-dashboard",
          icon: Users,
          label: "Dashboard",
          exact: false,
        },
        ...common,
      ];

    case "OWNER":
    case "USER":
      return [
        ...common,
        {
          path: "/hire-agents",
          icon: Briefcase,
          label: "Hire Agent",
          exact: false,
        },
      ];

    default:
      return common;
  }
}

export { getBottomNavItems };
