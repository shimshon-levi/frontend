import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";
import { fetchMe } from "./store/auth/authActions";

import PrivateRoute from "./routes/PrivateRoute";
import AdvisorLayout from "./layouts/AdvisorLayout";
import PrivateLayout from "./layouts/PrivateLayout";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdvisorDashboard from "./pages/advisor/AdvisorDashboard";
import AdvisorClientsPage from "./pages/advisor/AdvisorClientsPage";
import AdvisorCasesPage from "./pages/advisor/AdvisorCasesPage";
import AdvisorTemplatesPage from "./pages/advisor/AdvisorTemplatesPage";
import ReportsPage from "./pages/ReportsPage";
import ClientDashboard from "./pages/ClientDashboard";
import NotFoundPage from "./pages/NotFoundPage";
import { PATHS } from "./routes/paths";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchMe()); // יפעיל initialized=true בסוף
  }, [dispatch]);

  return (
    <Routes>
      <Route path={PATHS.login} element={<LoginPage />} />
      <Route path={PATHS.register} element={<RegisterPage />} />

      <Route
        path={PATHS.admin.root}
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdvisorLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdvisorDashboard />} />
        <Route path="clients" element={<AdvisorClientsPage />} />
        <Route path="cases" element={<AdvisorCasesPage />} />
        <Route path="templates" element={<AdvisorTemplatesPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>

      <Route
        path={PATHS.client.root}
        element={
          <PrivateRoute allowedRoles={["client"]}>
            <PrivateLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<ClientDashboard />} />
      </Route>

      <Route path="/" element={<Navigate to={PATHS.login} replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
export default App;
