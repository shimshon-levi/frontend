// src/App.tsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchMe } from "./store/auth/authActions";
import type { AppDispatch } from "./store";

import LoginPage from "./pages/LoginPage";
import AdvisorDashboard from "./pages/AdvisorDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./routes/PrivateRoute";
import RegisterPage from "./pages/RegisterPage";
import PrivateLayout from "./layouts/PrivateLayout"; // <<< חדש

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMe()); // אם יש קוקי תקף, ימלא Redux
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <Routes>
        {/* ציבורי */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* עיטוף פרטי לכל הדפים המוגנים */}
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
    </>
  );
}

export default App;
