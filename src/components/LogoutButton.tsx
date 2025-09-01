import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/auth/authActions";
import type { AppDispatch } from "../store";

export default function LogoutButton() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  return (
    <Button variant="outlined" onClick={onLogout}>
      התנתק
    </Button>
  );
}
