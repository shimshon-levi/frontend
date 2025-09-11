import {
  LayoutDashboard,
  Users2,
  FolderKanban,
  FileText,
  BarChart3,
} from "lucide-react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { ROLE_LABEL } from "../store/auth/roles";
import { doLogout } from "../store/auth/authActions";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  const { user } = useSelector((s: RootState) => s.auth);
  const initials = (user?.email || "י").slice(0, 1).toUpperCase();
  const roleLabel = user ? ROLE_LABEL[user.role] : "";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await dispatch<any>(doLogout());
    navigate("/login", { replace: true });
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-3 lg:p-4 shadow-sm
                 sticky top-4 h-[calc(100dvh-2rem)] overflow-y-auto flex flex-col"
      dir="rtl"
    >
      {/* לוגו */}
      <div className="flex items-center gap-2 mb-4">
        <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 font-bold">
          📄
        </div>
        <div>
          <div className="text-sm font-semibold">SmartDocs</div>
          <div className="text-[11px] text-gray-500">פלטפורמת יועצים</div>
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-2">ניווט</div>
      <nav className="space-y-1">
        {/* התאמה מדויקת ל-/admin */}
        <SidebarLink to="/admin" end>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="size-4" /> לוח בקרה
          </div>
        </SidebarLink>

        <SidebarLink to="/admin/clients">
          <div className="flex items-center gap-2">
            <Users2 className="size-4" /> לקוחות
          </div>
        </SidebarLink>

        <SidebarLink to="/admin/cases">
          <div className="flex items-center gap-2">
            <FolderKanban className="size-4" /> תיקים
          </div>
        </SidebarLink>

        <SidebarLink to="/admin/templates">
          <div className="flex items-center gap-2">
            <FileText className="size-4" /> תבניות
          </div>
        </SidebarLink>

        <SidebarLink to="/admin/reports">
          <div className="flex items-center gap-2">
            <BarChart3 className="size-4" /> דוחות
          </div>
        </SidebarLink>
      </nav>

      {/* סטטיסטיקות מהירות */}
      <div className="mt-4 space-y-2 text-[12px]">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            12
          </span>
          תיקים פעילים
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700">
            24
          </span>
          לקוחות
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            3
          </span>
          ממתינים לטיפול
        </div>
      </div>

      {/* משתמש – בתחתית */}
      <div className="mt-auto pt-4">
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <button className="w-full flex items-center justify-between rounded-2xl border px-3 py-2 hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                  {initials}
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">
                    {user?.email?.split("@")[0] || "משתמש"}
                  </div>
                  <div className="text-[11px] text-gray-500">{roleLabel}</div>
                </div>
              </div>
              <span className="text-gray-400">▾</span>
            </button>
          </Dropdown.Trigger>

          <Dropdown.Content
            side="top"
            align="end"
            className="z-50 rounded-xl border bg-white shadow-md p-1 min-w-[180px]"
          >
            <Dropdown.Item
              className="px-3 py-2 text-sm rounded-lg hover:bg-gray-100 cursor-pointer"
              onSelect={() => navigate("/admin/profile")}
            >
              החשבון שלי
            </Dropdown.Item>
            <Dropdown.Item
              className="px-3 py-2 text-sm rounded-lg hover:bg-gray-100 cursor-pointer"
              onSelect={() => navigate("/admin/settings")}
            >
              הגדרות
            </Dropdown.Item>
            <Dropdown.Separator className="h-px bg-gray-200 my-1" />
            <Dropdown.Item
              className="px-3 py-2 text-sm rounded-lg hover:bg-red-50 text-red-600 cursor-pointer"
              onSelect={logout}
            >
              התנתקות
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </div>
    </div>
  );
}
