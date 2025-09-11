// src/layouts/AdvisorLayout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "../nav/Sidebar";
import TopBar from "../nav/TopBar";

export default function AdvisorLayout() {
  return (
    <div className="min-h-screen w-full bg-slate-50" dir="rtl">
      {/* קונטיינר רוחב מקסימלי – נעים לעין במסכים רחבים */}
      <div className="mx-auto max-w-[1600px] px-3 sm:px-4 md:px-6 lg:px-8">
        {/* גריד: Sidebar קבוע + אזור תוכן */}
        <div className="grid grid-cols-1 lg:grid-cols-[264px_minmax(0,1fr)] gap-4 lg:gap-6 py-4">
          {/* Sidebar */}
          <aside className="order-2 lg:order-1">
            <Sidebar />
          </aside>

          {/* תוכן */}
          <main className="order-1 lg:order-2">
            <TopBar />
            <div className="mx-auto max-w-[1250px] xl:max-w-[1380px] py-4">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
