import axios from "axios";

const api = axios.create({
  // חשוב: שיצביע לגייטווי (8000), לא לשירותי משנה
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000",
  withCredentials: true, // חובה כדי שה-cookie ישלח
});

// לוגים לצורך דיבוג (אפשר למחוק אחרי שעובד)
api.interceptors.request.use((config) => {
  // שים לב: cookie הוא HttpOnly ולכן לא נראה כאן, אבל נבדוק שהדגל מופעל
  // וכן אם יש Authorization
  // eslint-disable-next-line no-console
  console.log(
    "[HTTP] →",
    config.method?.toUpperCase(),
    config.url,
    "withCreds:",
    config.withCredentials,
    "Auth hdr:",
    !!config.headers?.Authorization
  );
  return config;
});
api.interceptors.response.use(
  (res) => {
    // eslint-disable-next-line no-console
    console.log("[HTTP] ←", res.status, res.config.url);
    return res;
  },
  (err) => {
    // eslint-disable-next-line no-console
    console.warn(
      "[HTTP] ✖",
      err?.response?.status,
      err?.config?.url,
      err?.response?.data
    );
    return Promise.reject(err);
  }
);

export default api;
