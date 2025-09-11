import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import PageWrapper from "../../components/PageWrapper";
import DataTable from "../../components/DataTable";
import StatCard from "../../components/StatCard";
import QuickActions from "../../components/QuickActions";
import { keys } from "../../services/queries/keys";
import { casesQueries } from "../../services/queries/cases";
import { clientsQueries } from "../../services/queries/clients";
import { templatesQueries } from "../../services/queries/templates";

export default function AdvisorDashboard() {
  const { data: cases = [] } = useQuery({
    queryKey: keys.cases.my(),
    queryFn: casesQueries.my,
  });
  const { data: clients = [] } = useQuery({
    queryKey: keys.clients.my(),
    queryFn: clientsQueries.myClients,
  });
  const { data: templates = [] } = useQuery({
    queryKey: keys.templates.my(),
    queryFn: templatesQueries.my,
  });

  const stats = useMemo(() => {
    const totalClients = clients.length;
    const activeCases = cases.filter(
      (c: any) => c.status === "in_progress" || c.status === "open"
    ).length;
    const doneCases = cases.filter((c: any) => c.status === "done").length;
    const completionRate = cases.length
      ? Math.round((doneCases / cases.length) * 100)
      : 0;
    return {
      totalClients,
      activeCases,
      doneCases,
      completionRate,
      templatesCount: templates.length,
    };
  }, [clients, cases, templates]);

  const recentClients = useMemo(() => [...clients].slice(0, 6), [clients]);
  const recentCases = useMemo(() => [...cases].slice(0, 6), [cases]);

  return (
    <PageWrapper title="לוח בקרה">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="שיעור השלמה"
          value={`${stats.completionRate}%`}
          subtitle="בחודש האחרון"
          accent="indigo"
        />
        <StatCard
          title="תיקים שהושלמו"
          value={stats.doneCases}
          subtitle="החודש"
          accent="emerald"
        />
        <StatCard
          title="תיקים פעילים"
          value={stats.activeCases}
          subtitle="מתוכם"
          accent="purple"
        />
        <StatCard
          title="סה״כ לקוחות"
          value={stats.totalClients}
          subtitle={`${stats.templatesCount} תבניות`}
          accent="orange"
        />
      </div>

      <div className="mt-6">
        <QuickActions />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="card p-4">
          <div className="text-lg font-semibold mb-2">לקוחות אחרונים</div>
          <DataTable
            rows={recentClients}
            columns={[
              { field: "firstName", headerName: "שם" },
              { field: "company", headerName: "חברה" },
              { field: "email", headerName: "אימייל" },
              { field: "phone", headerName: "טלפון" },
            ]}
          />
        </div>
        <div className="card p-4">
          <div className="text-lg font-semibold mb-2">תיקים אחרונים</div>
          <DataTable
            rows={recentCases}
            columns={[
              { field: "title", headerName: "כותרת" },
              { field: "status", headerName: "סטטוס" },
              { field: "clientId", headerName: "לקוח" },
              { field: "updatedAt", headerName: "עודכן" },
            ]}
          />
        </div>
      </div>
    </PageWrapper>
  );
}
