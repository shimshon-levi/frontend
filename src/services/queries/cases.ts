import { get, post, patch } from "../http";

export type CaseStatus = "open" | "in_progress" | "done" | "pending";

export interface Case {
  id: string;
  title: string;
  status: CaseStatus;
  clientId: string;
  updatedAt?: string;
  createdAt?: string;
}

export const casesQueries = {
  // לקוח: התיקים שלי
  my: async () => {
    return await get<Case[]>("/cases/my");
  },

  // מנהל: רשימת תיקים (התאם בהתאם ל-API שלך)
  listAll: async () => {
    return await get<Case[]>("/cases");
  },

  byId: async (id: string) => {
    return await get<Case>(`/cases/${id}`);
  },

  create: async (dto: { title: string; clientId: string }) => {
    return await post<Case>("/cases", dto);
  },

  fromTemplate: async (dto: { templateId: string; clientId: string }) => {
    return await post<Case>("/cases/from-template", dto);
  },

  update: async (id: string, dto: Partial<Case>) => {
    return await patch<Case>(`/cases/${id}`, dto);
  },
};
