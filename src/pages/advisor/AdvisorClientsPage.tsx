import { useEffect, useMemo, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import DataTable from "../../components/DataTable";
import StatCard from "../../components/StatCard";
import { clientsQueries, type Client } from "../../services/queries/clients";
import AddClientDialog from "../../components/AddClientDialog";

export default function AdvisorClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "" | "active" | "pending" | "inactive"
  >("");
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    clientsQueries.myClients().then(setClients).catch(console.error);
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return clients.filter((c) => {
      const passStatus = statusFilter ? c.status === statusFilter : true;
      const passSearch =
        !s ||
        [c.firstName, c.lastName, c.company, c.email, c.phone]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(s));
      return passStatus && passSearch;
    });
  }, [clients, q, statusFilter]);

  const kpis = useMemo(() => {
    const total = clients.length;
    const inactive = clients.filter((c) => c.status === "inactive").length;
    const withActiveCases = clients.filter(
      (c) => (c.activeCasesCount ?? 0) > 0
    ).length;
    return { total, inactive, withActiveCases };
  }, [clients]);

  return (
    <PageWrapper title="ניהול לקוחות">
      {/* KPI */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="לא פעילים" value={kpis.inactive} />
        <StatCard title="עם תיקים פעילים" value={kpis.withActiveCases} />
        <StatCard title="סה״כ לקוחות" value={kpis.total} />
      </div>

      {/* סרגל פעולות/חיפוש */}
      <div className="mt-4 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
        <select
          className="border rounded-xl px-3 py-2 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
        >
          <option value="">כל הסטטוסים</option>
          <option value="active">פעיל</option>
          <option value="pending">ממתין</option>
          <option value="inactive">לא פעיל</option>
        </select>

        <input
          className="border rounded-xl px-3 py-2 text-sm flex-1"
          placeholder="…חפש לקוחות"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <button
          className="rounded-xl bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-700"
          onClick={() => setOpenAdd(true)}
        >
          לקוח חדש +
        </button>
      </div>

      {/* טבלה */}
      <div className="card p-4 mt-4">
        <div className="text-lg font-semibold mb-2">רשימת לקוחות</div>
        <DataTable
          rows={filtered}
          columns={[
            { field: "firstName", headerName: "שם" },
            { field: "company", headerName: "חברה", width: 180 },
            { field: "email", headerName: "אימייל", width: 220 },
            { field: "phone", headerName: "טלפון", width: 140 },
            { field: "status", headerName: "סטטוס", width: 100 },
            {
              field: "activeCasesCount",
              headerName: "תיקים פעילים",
              width: 120,
            },
          ]}
        />
      </div>

      {/* דיאלוג הוספה */}
      <AddClientDialog
        open={openAdd}
        onOpenChange={setOpenAdd}
        onCreated={(c) => setClients((prev) => [c, ...prev])}
      />
    </PageWrapper>
  );
}
