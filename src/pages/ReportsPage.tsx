import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import PageWrapper from "../components/PageWrapper";
import StatCard from "../components/StatCard";
import { keys } from "../services/queries/keys";
import { casesQueries } from "../services/queries/cases";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function ReportsPage() {
  const { data: cases = [] } = useQuery({
    queryKey: keys.cases.my(),
    queryFn: casesQueries.my,
  });

  const kpis = useMemo(() => {
    const total = cases.length;
    const active = cases.filter((c: any) => c.status !== "done").length;
    const needAttention = cases.filter(
      (c: any) => c.status === "pending"
    ).length;
    const completion = total ? Math.round(((total - active) / total) * 100) : 0;
    return { total, active, needAttention, completion };
  }, [cases]);

  const byMonth = useMemo(() => {
    const m = new Map<string, number>();
    for (const c of cases as any[]) {
      const d = new Date(c.createdAt || c.updatedAt || Date.now());
      const key = `${String(d.getMonth() + 1).padStart(2, "0")}/${String(
        d.getFullYear()
      ).slice(-2)}`;
      m.set(key, (m.get(key) || 0) + 1);
    }
    return [...m.entries()].sort().map(([name, value]) => ({ name, value }));
  }, [cases]);

  const byStatus = useMemo(() => {
    const m = new Map<string, number>();
    for (const c of cases as any[]) m.set(c.status, (m.get(c.status) || 0) + 1);
    return [...m.entries()].map(([name, value]) => ({ name, value }));
  }, [cases]);

  return (
    <PageWrapper title="דוחות ותובנות">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="לקוחות פעילים" value={kpis.active} />
        <StatCard title="ממתינים לטיפול" value={kpis.needAttention} />
        <StatCard title="שיעור השלמה" value={`${kpis.completion}%`} />
        <StatCard title="סה״כ תיקים" value={kpis.total} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <div
          className="rounded-2xl shadow-sm border border-gray-100 bg-white p-4"
          style={{ height: 320 }}
        >
          <div className="text-lg font-semibold mb-2">תיקים לאורך זמן</div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byMonth}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          className="rounded-2xl shadow-sm border border-gray-100 bg-white p-4"
          style={{ height: 320 }}
        >
          <div className="text-lg font-semibold mb-2">התפלגות סטטוס תיקים</div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={byStatus}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {byStatus.map((_e, i) => (
                  <Cell key={i} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageWrapper>
  );
}
