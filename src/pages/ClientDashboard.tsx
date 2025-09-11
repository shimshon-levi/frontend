import { useQuery } from "@tanstack/react-query";
import PageWrapper from "../components/PageWrapper";
import DataTable from "../components/DataTable";
import { keys } from "../services/queries/keys";
import { casesQueries } from "../services/queries/cases";
import { clientsQueries } from "../services/queries/clients";

export default function ClientDashboard() {
  const { data: me } = useQuery({
    queryKey: keys.clients.me(),
    queryFn: clientsQueries.me,
  });
  const { data: myCases = [] } = useQuery({
    queryKey: keys.cases.my(),
    queryFn: casesQueries.my,
  });

  return (
    <PageWrapper title={`שלום ${me?.firstName ?? ""}`}>
      <div className="card p-4">
        <div className="text-lg font-semibold mb-2">התיקים שלי</div>
        <DataTable
          rows={myCases}
          columns={[
            { field: "title", headerName: "כותרת" },
            { field: "status", headerName: "סטטוס" },
            { field: "updatedAt", headerName: "עודכן" },
          ]}
        />
      </div>
    </PageWrapper>
  );
}
