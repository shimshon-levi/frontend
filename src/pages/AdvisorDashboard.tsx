import { Stack, Typography, Card, CardContent } from "@mui/material";
import PageWrapper from "../components/PageWrapper";
import { useMyClients } from "../services/queries/clients";
import { useMyTemplates } from "../services/queries/templates";
import DataTable from "../components/DataTable";

const AdvisorDashboard = () => {
  const { data: clients = [], isLoading: loadingClients } = useMyClients();
  const { data: templates = [], isLoading: loadingTemplates } =
    useMyTemplates();

  return (
    <PageWrapper className="p-3">
      <Typography variant="h5" gutterBottom>
        לוח יועץ
      </Typography>

      <Stack spacing={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              הלקוחות שלי
            </Typography>
            {loadingClients ? (
              "טוען..."
            ) : (
              <DataTable
                columns={[
                  {
                    id: "name",
                    label: "שם",
                    render: (r: any) => r?.userId?.name || "-",
                  },
                  {
                    id: "email",
                    label: "אימייל",
                    render: (r: any) => r?.userId?.email || "-",
                  },
                ]}
                data={clients}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              הטמפלטים שלי
            </Typography>
            {loadingTemplates ? (
              "טוען..."
            ) : (
              <DataTable
                columns={[
                  { id: "title", label: "כותרת" },
                  { id: "description", label: "תיאור" },
                ]}
                data={templates}
              />
            )}
          </CardContent>
        </Card>
      </Stack>
    </PageWrapper>
  );
};

export default AdvisorDashboard;
