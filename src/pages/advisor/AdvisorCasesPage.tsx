import { useQuery } from "@tanstack/react-query";
import PageWrapper from "../../components/PageWrapper";
import DataTable from "../../components/DataTable";
import { keys } from "../../services/queries/keys";
import { casesQueries } from "../../services/queries/cases";

export default function AdvisorCasesPage() {
  const { data: rows = [] } = useQuery({
    queryKey: keys.cases.my(),
    queryFn: casesQueries.my,
  });
  return (
    <PageWrapper title="תיקים">
      <div className="card p-4">
        <DataTable
          rows={rows}
          columns={[
            { field: "title", headerName: "כותרת" },
            { field: "status", headerName: "סטטוס" },
            { field: "clientId", headerName: "לקוח" },
            { field: "updatedAt", headerName: "עודכן" },
          ]}
        />
      </div>
    </PageWrapper>
  );
}
