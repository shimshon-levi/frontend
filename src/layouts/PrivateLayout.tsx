import { Outlet } from "react-router-dom";
import AppShell from "../nav/AppShell";
import Sidebar from "../nav/Sidebar";
import TopBar from "../nav/TopBar";

export default function PrivateLayout() {
  return (
    <AppShell SidebarComponent={Sidebar} TopBarComponent={TopBar}>
      <Outlet />
    </AppShell>
  );
}
