export const keys = {
  clients: {
    all: ["clients"] as const,
    my: () => [...keys.clients.all, "my"] as const,
    me: () => [...keys.clients.all, "me"] as const,
    search: (q?: string) => [...keys.clients.all, "search", q ?? ""] as const,
  },
  cases: {
    all: ["cases"] as const,
    list: () => [...keys.cases.all, "list"] as const, // <- חדש (מנהל)
    my: () => [...keys.cases.all, "my"] as const,
    byId: (id: string) => [...keys.cases.all, "id", id] as const,
  },
  templates: {
    all: ["templates"] as const,
    my: () => [...keys.templates.all, "my"] as const,
    byId: (id: string) => [...keys.templates.all, "id", id] as const,
  },
};
