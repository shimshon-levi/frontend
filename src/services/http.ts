import type { AxiosRequestConfig } from "axios";
import api from "../api/baseApi";

// מחזיר תמיד את data ומאפשר טיפוס גנרי T
export async function get<T>(url: string, config?: AxiosRequestConfig) {
  const { data } = await api.get<T>(url, config);
  return data;
}

export async function post<T>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig
) {
  const { data } = await api.post<T>(url, body, config);
  return data;
}

export async function patch<T>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig
) {
  const { data } = await api.patch<T>(url, body, config);
  return data;
}

export async function del<T>(url: string, config?: AxiosRequestConfig) {
  const { data } = await api.delete<T>(url, config);
  return data;
}
