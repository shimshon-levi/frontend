import { useQuery } from "@tanstack/react-query";
import PageWrapper from "../../components/PageWrapper";
import DataTable from "../../components/DataTable";
import { keys } from "../../services/queries/keys";
import { templatesQueries } from "../../services/queries/templates";

export default function AdvisorTemplatesPage() {
  const { data: rows = [] } = useQuery({
    queryKey: keys.templates.my(),
    queryFn: templatesQueries.my,
  });
  return (
    <PageWrapper title="תבניות">
      <div className="card p-4">
        <DataTable
          rows={rows}
          columns={[
            { field: "name", headerName: "שם" },
            { field: "description", headerName: "תיאור" },
          ]}
        />
      </div>
    </PageWrapper>
  );
}
