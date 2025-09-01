import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clientApi } from "../../api";
import { environment } from "../../utils/globals";
import { qk } from "./keys";

export type Client = {
  _id: string;
  userId: { name?: string; email?: string };
  advisorId: string;
  caseIds?: string[];
};

export const useMyClients = () =>
  useQuery<Client[]>({
    queryKey: qk.clients.my(),
    queryFn: async () => {
      const { data } = await clientApi.get(environment.api.clients.myClients);
      return data;
    },
  });

export const useCreateClient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { userId: string; advisorId: string }) => {
      const { data } = await clientApi.post(
        environment.api.clients.root,
        payload
      );
      return data as Client;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.clients.my() }),
  });
};
