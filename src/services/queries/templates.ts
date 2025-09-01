import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clientApi } from "../../api";
import { environment } from "../../utils/globals";
import { qk } from "./keys";

export type Template = {
  _id: string;
  title: string;
  description?: string;
  questions?: { question: string; fieldType: string; required?: boolean }[];
  requiredDocuments?: {
    name: string;
    description?: string;
    required?: boolean;
  }[];
};

export const useMyTemplates = () =>
  useQuery<Template[]>({
    queryKey: qk.templates.my(),
    queryFn: async () => {
      const { data } = await clientApi.get(environment.api.templates.my);
      return data;
    },
  });

export const useTemplateById = (id: string) =>
  useQuery<Template>({
    queryKey: qk.templates.byId(id),
    queryFn: async () => {
      const { data } = await clientApi.get(environment.api.templates.byId(id));
      return data;
    },
    enabled: !!id,
  });

export const useCreateTemplate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Template, "_id">) => {
      const { data } = await clientApi.post(
        environment.api.templates.root,
        payload
      );
      return data as Template;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.templates.my() }),
  });
};
