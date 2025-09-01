import type { AppDispatch } from "../index";
import { loginStart, loginSuccess, loginFailure, logout } from "./authSlice";
import { authApi } from "../../api"; // <<< משתמשים ב-authApi
import { environment } from "../../utils/globals"; // <<< נתיבים מרוכזים

// טוען סטטוס משתמש בתחילת האפליקציה (אם יש קוקי תקף בצד שרת)
export const fetchMe = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await authApi.get(environment.api.auth.me); // { userId, email, role }
    dispatch(
      loginSuccess({ userId: data.userId, token: "cookie", role: data.role })
    );
  } catch {
    // לא מחובר – מתעלמים
  }
};

export const loginUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(loginStart());
      const { data } = await authApi.post(environment.api.auth.login, {
        email,
        password,
      });
      // data = { token, userId, role } כבר מהשרת
      dispatch(
        loginSuccess({ userId: data.userId, token: "cookie", role: data.role })
      );
      // אופציונלי: לא צריך /auth/me כאן
    } catch (error: any) {
      const message = error?.response?.data?.message || "Login failed";
      dispatch(loginFailure(message));
    }
  };

export const registerUser =
  (payload: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(loginStart());
      const { data } = await authApi.post(
        environment.api.auth.register,
        payload
      );
      dispatch(
        loginSuccess({ userId: data.userId, token: "cookie", role: data.role })
      );
    } catch (error: any) {
      const message = error?.response?.data?.message || "Registration failed";
      dispatch(loginFailure(message));
    }
  };

export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    await authApi.post(environment.api.auth.logout); // מוחק את הקוקי בצד שרת
  } finally {
    dispatch(logout()); // תמיד ננקה Redux
  }
};
