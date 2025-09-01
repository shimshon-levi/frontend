import type { Store } from "@reduxjs/toolkit";
import { logout } from "../store/auth/authSlice";
import { authApi, clientApi, docsApi } from "./index";

/**
 * מאזין לכל תשובות axios. אם אחד השירותים מחזיר 401 – ננקה את ה־Redux (logout).
 * זה גורם ל-PrivateRoute להפנות חזרה ל-/login.
 */
export default function setupAxiosInterceptors(store: Store) {
  const onRejected = (error: any) => {
    if (error?.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  };

  [authApi, clientApi, docsApi].forEach((api) => {
    api.interceptors.response.use((res) => res, onRejected);
  });
}
