// src/components/QuickActions.tsx
import { useNavigate } from "react-router-dom";
import { Sparkles, FilePlus2, Users, FolderPlus } from "lucide-react";

type TileProps = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  hoverClasses: string; // לדוגמה: "hover:bg-purple-50 hover:border-purple-200"
  onClick?: () => void;
};

function Tile({ title, subtitle, icon, hoverClasses, onClick }: TileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      dir="rtl"
      className={[
        "group relative text-right w-full",
        "rounded-2xl border border-gray-200 bg-white p-4",
        "transition-colors shadow-sm hover:shadow-md",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10",
        hoverClasses,
      ].join(" ")}
    >
      <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 ring-1 ring-inset ring-gray-200 group-hover:bg-white">
        {icon}
      </span>
      <div className="text-sm font-medium text-gray-900">{title}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </button>
  );
}

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <section
      dir="rtl"
      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      {/* כותרת החלק */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
            <Sparkles className="size-4" />
          </span>
          פעולות מהירות
        </div>
      </div>

      {/* האריחים */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Tile
          title="תיק חדש"
          subtitle="יצירת תיק ללקוח"
          icon={<FilePlus2 className="size-4 text-purple-600" />}
          hoverClasses="hover:bg-purple-50 hover:border-purple-200"
          onClick={() => navigate("/admin/cases?create=1")}
        />
        <Tile
          title="לקוח חדש"
          subtitle="הוסף לקוח למערכת"
          icon={<Users className="size-4 text-emerald-600" />}
          hoverClasses="hover:bg-emerald-50 hover:border-emerald-200"
          onClick={() => navigate("/admin/clients?create=1")}
        />
        <Tile
          title="מתבנית"
          subtitle="פתח תיק מתבנית"
          icon={<FolderPlus className="size-4 text-indigo-600" />}
          hoverClasses="hover:bg-indigo-50 hover:border-indigo-200"
          onClick={() => navigate("/admin/templates")}
        />
      </div>
    </section>
  );
}
