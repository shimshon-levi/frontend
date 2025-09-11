import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../store/auth/authActions";
import type { AppDispatch } from "../store";

export default function LogoutButton() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onLogout = async () => {
    await dispatch(doLogout());
    navigate("/login", { replace: true });
  };

  return (
    <button
      onClick={onLogout}
      className="px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition text-sm"
    >
      התנתק
    </button>
  );
}
