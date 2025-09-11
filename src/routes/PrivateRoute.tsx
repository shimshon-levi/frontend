import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";
import type { JSX } from "react";
import type { Role } from "../store/auth/roles";

type Props = { children: JSX.Element; allowedRoles?: Role[] };
const PrivateRoute = ({ children, allowedRoles }: Props) => {
  const { isAuthenticated, user } = useSelector((s: RootState) => s.auth);
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <Navigate to={user.role === "client" ? "/client" : "/admin"} replace />
    );
  }
  return children;
};
export default PrivateRoute;
