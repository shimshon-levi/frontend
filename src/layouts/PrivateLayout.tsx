// src/layouts/PrivateLayout.tsx
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import PrivateHeader from "../components/PrivateHeader";

export default function PrivateLayout() {
  return (
    <>
      <PrivateHeader /> {/* כאן כפתור Logout ועוד UI משותף */}
      <Container maxWidth="lg" sx={{ pt: 2 }}>
        <Outlet /> {/* כאן נטען תוכן הדף הספציפי (advisor/client) */}
      </Container>
    </>
  );
}
