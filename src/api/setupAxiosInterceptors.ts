import type { Store } from "@reduxjs/toolkit";
import { logout } from "../store/auth/authSlice";
import api from "./baseApi";

export default function setupAxiosInterceptors(store: Store) {
  const onRejected = (error: any) => {
    if (error?.response?.status === 401) store.dispatch(logout());
    return Promise.reject(error);
  };
  api.interceptors.response.use((r) => r, onRejected);
}
