import AccessToken from "./accessToken";
import axios from "axios";
import type { AxiosResponse, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import type { TLoginRequest, TRegisterRequest, TAuthResponse } from "@/types";

const isDev = process.env.NODE_ENV === "development";
const API_DELAY = isDev ? 400 : 0;
const sleep = () => new Promise((resolve) => setTimeout(resolve, API_DELAY));

const axiosInstance = axios.create({
  baseURL: isDev
    ? "http://localhost:5000/api"
    : "https://flashcards.bayford.dev/api",
  timeout: 3000,
  withCredentials: true,
});

// Axios defaults
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

// Custom axios config
declare module "axios" {
  export interface AxiosRequestConfig {
    failSilently?: boolean;
  }
}

// Interceptors
axiosInstance.interceptors.request.use(
  (requestConfig) => {
    // console.log("axios request interceptor", requestConfig);
    const accessToken = AccessToken.get();
    if (accessToken) {
      requestConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    return requestConfig;
  },
  (err) => {
    console.log("axios request interceptor error", err);
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    // console.log("axios response interceptor", response);
    await sleep();
    return response;
  },
  (err) => {
    console.log("axios response interceptor error", err);
    const errorStatus = err?.status || 500;
    const errorMessage = err?.response?.data?.error || undefined;
    const originalRequestConfig = err?.config;

    console.log("errorStatus", errorStatus);
    console.log("errorMessage", errorMessage);
    console.log("originalRequestConfig", originalRequestConfig);

    if (!originalRequestConfig?.failSilently) {
      switch (errorStatus) {
        case 400:
          toast.error(errorMessage || "Client error");
          break;
        case 401:
          toast.error(errorMessage || "Unauthorized");
          break;
        case 403:
          toast.error(errorMessage || "Forbidden");
          break;
        default:
          toast.error(errorMessage || "Something went wromg");
      }
    }

    return Promise.reject(err);
  }
);

// Axios config
const requests = {
  get: async <T>(url: string, config: AxiosRequestConfig = {}) =>
    (await axiosInstance.get<T>(url, config)).data,

  post: async <TResponse, TBody = unknown>(
    url: string,
    body: TBody,
    config: AxiosRequestConfig = {}
  ) =>
    (
      await axiosInstance.post<TResponse, AxiosResponse<TResponse>, TBody>(
        url,
        body,
        config
      )
    ).data,

  put: async <TResponse, TBody = unknown>(
    url: string,
    body: TBody,
    config: AxiosRequestConfig = {}
  ) =>
    (
      await axiosInstance.put<TResponse, AxiosResponse<TResponse>, TBody>(
        url,
        body,
        config
      )
    ).data,

  delete: async <T>(url: string, config: AxiosRequestConfig = {}) =>
    (await axiosInstance.delete<T>(url, config)).data,
};

// APIS
const User = {
  login: (body: TLoginRequest) =>
    requests.post<TAuthResponse, TLoginRequest>("/user/login", {
      email: body.email,
      password: body.password,
    }),
  register: (body: TRegisterRequest) =>
    requests.post<TAuthResponse, TRegisterRequest>("/user/register", {
      email: body.email,
      password: body.password,
    }),
  refresh: ({ failSilently = false }: { failSilently?: boolean } = {}) =>
    requests.post<TAuthResponse>("/user/refresh", {}, { failSilently }),
  logout: () => requests.post<void>("/user/logout", {}),
};

const api = {
  User,
};

export default api;
