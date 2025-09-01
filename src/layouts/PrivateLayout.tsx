import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import PrivateHeader from "../components/PrivateHeader";

const PrivateLayout = () => (
  <>
    <PrivateHeader />
    <Container maxWidth="lg" sx={{ pt: 2 }}>
      <Outlet />
    </Container>
  </>
);

export default PrivateLayout;
