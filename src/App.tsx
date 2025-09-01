import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";
import { fetchMe } from "./store/auth/authActions";

import PrivateRoute from "./routes/PrivateRoute";
import PrivateLayout from "./layouts/PrivateLayout";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdvisorDashboard from "./pages/AdvisorDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <Routes>
      {/* ציבורי */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* פרטי */}
      <Route element={<PrivateLayout />}>
        <Route
          path="/advisor"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdvisorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/client"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <ClientDashboard />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
