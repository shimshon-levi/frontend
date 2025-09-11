import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { login } from "../store/auth/authActions";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../routes/paths";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector(
    (s: RootState) => s.auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      navigate(user.role === "client" ? PATHS.client.root : PATHS.admin.root, {
        replace: true,
      });
    }
  }, [isAuthenticated, user?.role, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50" dir="rtl">
      <form onSubmit={submit} className="card p-6 w-full max-w-sm space-y-3">
        <div className="text-xl font-semibold">התחברות</div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <Input
          placeholder="אימייל"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          placeholder="סיסמה"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading || !email || !password}>
          {loading ? "מתחבר..." : "התחבר"}
        </Button>
        <button
          type="button"
          className="text-sm text-gray-600 hover:underline"
          onClick={() => navigate(PATHS.register)}
        >
          עדיין אין לך משתמש? הרשם
        </button>
      </form>
    </div>
  );
}
