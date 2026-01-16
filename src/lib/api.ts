import AccessToken from "./accessToken";
import axios from "axios";
import type { AxiosResponse, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import type {
  TLoginRequest,
  TRegisterRequest,
  TAuthResponse,
  TQuestionsRequest,
  TPaginatedQuestions,
  TCategory,
} from "@/types";

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

// Custom axios config object
declare module "axios" {
  export interface AxiosRequestConfig {
    failSilently?: boolean;
  }
}

// Interceptors
axiosInstance.interceptors.request.use(
  async (requestConfig) => {
    // console.log("axios request interceptor", requestConfig);
    const accessToken = AccessToken.get();
    // console.log("accessToken", accessToken);
    if (accessToken) {
      requestConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    return requestConfig;
  },
  async (err) => {
    // console.log("axios request interceptor error", err);
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    // console.log("axios response interceptor", response);
    await sleep();
    return response;
  },
  async (err) => {
    // console.log("axios response interceptor error", err);
    const originalRequest = err?.config;
    const errorStatus = err?.status || 500;
    // Error message(s) can be single property or array
    const errorMessage = err?.response?.data?.error || undefined;
    const errorMessagesArray = err?.response?.data?.errors || undefined;

    // console.log("originalRequest", originalRequest);
    // console.log("errorStatus", errorStatus);
    // console.log("errorMessage", errorMessage);
    // console.log("errorMessagesArray", errorMessagesArray);

    // Global API error message handling
    if (!originalRequest?.failSilently) {
      switch (errorStatus) {
        case 400:
          if (errorMessagesArray) {
            errorMessagesArray.forEach((error: string) => {
              toast.error(error || "Client error");
            });
          } else if (errorMessage) {
            toast.error(errorMessage);
          } else {
            toast.error("Client error");
          }
          break;
        case 401:
          // Attempt refresh if not already a retry and not refresh request
          if (
            !originalRequest._retry &&
            !originalRequest.url.includes("/user/refresh")
          ) {
            originalRequest._retry = true;
            try {
              const { accessToken: newAccessToken } = await api.User.refresh();
              AccessToken.set(newAccessToken);
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              // Retry original request
              return axiosInstance(originalRequest);
            } catch (e) {
              console.error(`Error refreshing token: ${e}`);
              toast.error(errorMessage || "Unauthorized");
            }
          }
          break;
        case 403:
          toast.error(errorMessage || "Forbidden");
          break;
        default:
          if (errorMessagesArray) {
            errorMessagesArray.forEach((error: string) => {
              toast.error(error || "Something went wromg");
            });
          } else if (errorMessage) {
            toast.error(errorMessage);
          }
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

const Questions = {
  getQuestions: ({ page, categoryIds, hideMastered }: TQuestionsRequest) =>
    requests.get<TPaginatedQuestions>("/question", {
      params: {
        page: page ? page : undefined,
        categoryId: categoryIds ? categoryIds : undefined,
        hideMastered: hideMastered ? hideMastered : false,
      },
      paramsSerializer: {
        indexes: null,
      },
    }),
};

const Categories = {
  getCategories: () => requests.get<TCategory[]>("/category"),
};

const api = {
  User,
  Questions,
  Categories,
};

export default api;
