import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";
import type { JSX } from "react";
import type { Role } from "../store/auth/roles";
import { PATHS } from "./paths";

const roleHome: Record<Role, string> = {
  admin: PATHS.admin.root,
  client: PATHS.client.root,
};

type Props = { children: JSX.Element; allowedRoles?: Role[] };

const PrivateRoute = ({ children, allowedRoles }: Props) => {
  const { isAuthenticated, user, initialized } = useSelector(
    (s: RootState) => s.auth
  );

  // אל תזרוק ל-/login לפני שסיימנו לאתחל את ה-session
  if (!initialized) return <div style={{ padding: 24 }}>טוען…</div>;

  if (!isAuthenticated || !user) return <Navigate to={PATHS.login} replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={roleHome[user.role]} replace />;
  }

  return children;
};

export default PrivateRoute;
