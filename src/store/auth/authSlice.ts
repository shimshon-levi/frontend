import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Role } from "./roles";

type User = { id: string; email?: string; role: Role };

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(
      state,
      action: PayloadAction<{ user: User; token?: string | null }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token ?? null;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    setMe(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      if (!action.payload) state.token = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});
export const { loginStart, loginSuccess, loginFailure, setMe, logout } =
  slice.actions;
export default slice.reducer;
