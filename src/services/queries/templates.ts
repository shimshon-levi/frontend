import { get, post } from "../http";

export interface Template {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

export const templatesQueries = {
  my: async () => {
    return await get<Template[]>("/templates/my");
  },

  create: async (dto: { name: string; description?: string }) => {
    return await post<Template>("/templates", dto);
  },

  byId: async (id: string) => {
    return await get<Template>(`/templates/${id}`);
  },
};
