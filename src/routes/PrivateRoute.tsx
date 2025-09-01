import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";
import type { JSX } from "react";

type Role = "admin" | "client";

type Props = {
  children: JSX.Element;
  allowedRoles: Role[];
};

const PrivateRoute = ({ children, allowedRoles }: Props) => {
  const { isAuthenticated, role } = useSelector((s: RootState) => s.auth);
  if (!isAuthenticated || !role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
