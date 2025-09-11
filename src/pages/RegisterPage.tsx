import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { registerUser } from "../store/auth/authActions";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../routes/paths";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector(
    (s: RootState) => s.auth
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      navigate(user.role === "client" ? PATHS.client.root : PATHS.admin.root, {
        replace: true,
      });
    }
  }, [isAuthenticated, user?.role, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50" dir="rtl">
      <form onSubmit={submit} className="card p-6 w-full max-w-md space-y-3">
        <div className="text-xl font-semibold">הרשמה</div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <Input
          name="name"
          placeholder="שם"
          value={form.name}
          onChange={onChange}
          required
        />
        <Input
          name="email"
          placeholder="אימייל"
          value={form.email}
          onChange={onChange}
          type="email"
          required
        />
        <Input
          name="password"
          placeholder="סיסמה"
          value={form.password}
          onChange={onChange}
          type="password"
          required
        />
        <Input
          name="phone"
          placeholder="טלפון"
          value={form.phone}
          onChange={onChange}
        />
        <Input
          name="address"
          placeholder="כתובת"
          value={form.address}
          onChange={onChange}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "נרשם..." : "צור משתמש"}
        </Button>
        <button
          type="button"
          className="text-sm text-gray-600 hover:underline"
          onClick={() => navigate(PATHS.login)}
        >
          יש לך חשבון? התחבר
        </button>
      </form>
    </div>
  );
}
