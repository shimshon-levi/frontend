import { get, post } from "../http";

export interface CreateClientDto {
  firstName: string;
  lastName?: string;
  phone?: string;
  email?: string;
  company?: string;
}

export interface Client {
  id: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  email?: string;
  company?: string;
  status?: "active" | "inactive" | "pending";
  activeCasesCount?: number;
}

export const clientsQueries = {
  create: async (dto: CreateClientDto) => {
    return await post<Client>("/clients", dto);
  },

  // שים לב: אצלך זה לרוב Admin בלבד (requireAdmin)
  myClients: async () => {
    return await get<Client[]>("/api/clients/my-clients");
  },

  me: async () => {
    return await get<Client>("/clients/me");
  },

  search: async (params: { q?: string; page?: number; limit?: number }) => {
    return await get<{ items: Client[]; total: number }>("/clients", {
      params,
    });
  },
};
