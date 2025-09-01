export const environment = {
  baseUrls: {
    auth: import.meta.env.VITE_AUTH_BASE_URL,
    client: import.meta.env.VITE_CLIENT_BASE_URL,
    docs: import.meta.env.VITE_DOCS_BASE_URL,
  },
  cookie: {
    name: import.meta.env.VITE_AUTH_COOKIE_NAME,
  },
  api: {
    // AUTH
    auth: {
      login: "/auth/login",
      register: "/auth/register",
      me: "/auth/me",
      logout: "/auth/logout",
    },
    // CLIENTS
    clients: {
      root: "/clients",
      myClients: "/clients/my-clients",
      me: "/clients/me",
    },
    // CASES
    cases: {
      root: "/cases",
      byId: (id: string) => `/cases/${id}`,
      fromTemplate: "/cases/from-template",
    },
    // TEMPLATES
    templates: {
      root: "/templates",
      my: "/templates/my",
      byId: (id: string) => `/templates/${id}`,
    },
    // DOCUMENTS
    documents: {
      root: "/documents",
      byCase: (caseId: string) => `/documents/case/${caseId}`,
      byId: (id: string) => `/documents/${id}`,
      download: (id: string) => `/documents/${id}/download`,
    },
  },
} as const;
