import { Typography } from "@mui/material";
import PageWrapper from "../components/PageWrapper";
import { useMyCases } from "../services/queries/cases";
import DataTable from "../components/DataTable";

const ClientDashboard = () => {
  const { data: cases = [], isLoading } = useMyCases();

  return (
    <PageWrapper className="p-3">
      <Typography variant="h5" gutterBottom>
        הדשבורד שלי
      </Typography>
      {isLoading ? (
        "טוען..."
      ) : (
        <DataTable
          columns={[
            { id: "title", label: "כותרת" },
            { id: "status", label: "סטטוס" },
          ]}
          data={cases}
        />
      )}
    </PageWrapper>
  );
};

export default ClientDashboard;
