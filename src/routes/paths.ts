export const PATHS = {
  login: "/login",
  register: "/register",
  admin: {
    root: "/admin",
    clients: "/admin/clients",
    cases: "/admin/cases",
    templates: "/admin/templates",
    reports: "/admin/reports",
    profile: "/admin/profile",
    settings: "/admin/settings",
  },
  client: { root: "/client" },
} as const;
