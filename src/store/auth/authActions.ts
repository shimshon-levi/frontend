import type { AppDispatch } from "../index";
import api from "../../api/baseApi";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout as logoutAction,
  setMe,
} from "./authSlice";
import type { Role } from "./roles";

type AuthUserResp = {
  userId: string;
  email?: string;
  role: Role;
  token?: string;
};
type MeResp = { userId: string; email?: string; role: Role };
type LoginDto = { email: string; password: string };
type RegisterDto = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
};

const getErr = (e: any) =>
  e?.response?.data?.message ?? e?.message ?? "Unexpected error";

export const login = (dto: LoginDto) => async (dispatch: AppDispatch) => {
  try {
    dispatch(loginStart());
    const { data } = await api.post<AuthUserResp>("/auth/login", dto);
    dispatch(
      loginSuccess({
        user: { id: data.userId, email: data.email, role: data.role },
        token: data.token ?? null,
      })
    );
  } catch (e: any) {
    dispatch(loginFailure(getErr(e)));
  }
};

export const register = (dto: RegisterDto) => async (dispatch: AppDispatch) => {
  try {
    dispatch(loginStart());
    await api.post("/auth/register", dto);
    const { data } = await api.post<AuthUserResp>("/auth/login", {
      email: dto.email,
      password: dto.password,
    });
    dispatch(
      loginSuccess({
        user: { id: data.userId, email: data.email, role: data.role },
        token: data.token ?? null,
      })
    );
  } catch (e: any) {
    dispatch(loginFailure(getErr(e)));
  }
};

export const fetchMe = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.get<MeResp>("/auth/me");
    dispatch(setMe({ id: data.userId, email: data.email, role: data.role }));
  } catch {
    dispatch(setMe(null));
  }
};

export const doLogout = () => async (dispatch: AppDispatch) => {
  try {
    await api.post("/auth/logout");
  } finally {
    dispatch(logoutAction());
  }
};

// תאימות לייבוא ישנים
export { register as registerUser };
export { doLogout as logoutUser };
