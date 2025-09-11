// src/nav/AppShell.tsx
import { Outlet } from "react-router-dom";
import type { ComponentType, ReactNode } from "react";

type AppShellProps = {
  SidebarComponent: ComponentType;
  TopBarComponent?: ComponentType;
  children?: ReactNode;
};

export default function AppShell({
  SidebarComponent,
  TopBarComponent,
  children,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* תוכן משמאל (1fr) + סיידבר מימין (260px) */}
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-6 md:px-8 py-4 grid grid-cols-[1fr,260px] gap-4">
        {/* MAIN (עמודה שמאלית) */}
        <main className="min-w-0 space-y-4">
          {TopBarComponent ? <TopBarComponent /> : null}
          <div className="space-y-4">{children ?? <Outlet />}</div>
        </main>

        {/* SIDEBAR (עמודה ימנית) */}
        <aside className="w-[260px] self-start">
          <SidebarComponent />
        </aside>
      </div>
    </div>
  );
}
