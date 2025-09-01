// src/routes/PrivateRoute.tsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store/index";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  allowedRoles: ("admin" | "client")[];
}

const PrivateRoute = ({ children, allowedRoles }: Props) => {
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated || !role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
