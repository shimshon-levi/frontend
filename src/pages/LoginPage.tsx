// src/pages/LoginPage.tsx
import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/auth/authActions";
import type { RootState, AppDispatch } from "../store/index";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated, role } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (isAuthenticated && role) {
      navigate(role === "admin" ? "/advisor" : "/client");
    }
  }, [isAuthenticated, role, navigate]);

  return (
    <Box sx={{ maxWidth: 400, mx: "auto" }}>
      <Typography variant="h4">התחברות</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="אימייל"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="סיסמה"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? "מתחבר..." : "התחבר"}
        </Button>
      </form>
      <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate("/register")}>
        עדיין אין לך משתמש? הרשם כאן
      </Button>
    </Box>
  );
};

export default LoginPage;
