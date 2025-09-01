export const qk = {
  clients: { all: ["clients"] as const, my: () => ["clients", "my"] as const },
  templates: {
    all: ["templates"] as const,
    my: () => ["templates", "my"] as const,
    byId: (id: string) => ["templates", id] as const,
  },
  cases: {
    all: ["cases"] as const,
    my: () => ["cases", "my"] as const,
    byId: (id: string) => ["cases", id] as const,
  },
} as const;
