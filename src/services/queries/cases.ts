import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clientApi } from "../../api";
import { environment } from "../../utils/globals";
import { qk } from "./keys";

export type CaseStatus = "open" | "in_progress" | "completed" | "closed";
export type CaseEntity = { _id: string; title: string; status: CaseStatus };

export const useMyCases = () =>
  useQuery<CaseEntity[]>({
    queryKey: qk.cases.my(),
    queryFn: async () => {
      const { data } = await clientApi.get(`${environment.api.cases.root}/my`);
      return data;
    },
  });

export const useCaseById = (id: string) =>
  useQuery<CaseEntity>({
    queryKey: qk.cases.byId(id),
    queryFn: async () => {
      const { data } = await clientApi.get(environment.api.cases.byId(id));
      return data;
    },
    enabled: !!id,
  });

export const useCreateCaseFromTemplate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { templateId: string; clientId: string }) => {
      const { data } = await clientApi.post(
        environment.api.cases.fromTemplate,
        payload
      );
      return data as CaseEntity;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.cases.my() }),
  });
};

export const useUpdateCaseStatus = (id: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { status: CaseStatus }) => {
      const { data } = await clientApi.patch(
        environment.api.cases.byId(id),
        payload
      );
      return data as CaseEntity;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.cases.my() });
      qc.invalidateQueries({ queryKey: qk.cases.byId(id) });
    },
  });
};
