import AccessToken from "./accessToken";
import axios from "axios";
import type { AxiosResponse, AxiosRequestConfig } from "axios";
import { triggerLogoutHandler } from "./auth";
import { toast } from "react-toastify";
import type {
  TCategory,
  TLoginRequest,
  TRegisterRequest,
  TAuthResponse,
  TQuestionsRequest,
  TPaginatedQuestions,
  TQuestion,
  TCreateNewQuestionRequest,
  TUpdateQuestionRequest,
  TCreateCategory,
  TUpdateCategory,
} from "@/types";

const isDev = import.meta.env.DEV;
const API_DELAY = isDev ? 400 : 0;
const sleep = () => new Promise((resolve) => setTimeout(resolve, API_DELAY));

const axiosInstance = axios.create({
  baseURL: isDev ? "http://localhost:5000/api" : "/api",
  timeout: 6000,
  withCredentials: true, // inc cookies for refresh token
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
    const accessToken = AccessToken.get();
    if (accessToken) {
      // Confirm header object exists before adding token
      requestConfig.headers = requestConfig.headers || {};
      requestConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    return requestConfig;
  },
  async (err) => {
    return Promise.reject(err);
  },
);

axiosInstance.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  async (err) => {
    const originalRequest = err?.config;
    const errorStatus = err?.response?.status || 500;
    // Error message(s) can be single property or an array
    const errorMessage = err?.response?.data?.error || undefined;
    const errorMessagesArray = err?.response?.data?.errors || undefined;

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
              if (newAccessToken) {
                AccessToken.set(newAccessToken);
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              }
              // Retry original request
              return axiosInstance(originalRequest);
            } catch (e) {
              console.error(`Error refreshing token: ${e}`);
              triggerLogoutHandler();
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
          } else {
            toast.error("Something went wrong");
          }
      }
    }

    return Promise.reject(err);
  },
);

// Axios config
const requests = {
  get: async <T>(url: string, config: AxiosRequestConfig = {}) =>
    (await axiosInstance.get<T>(url, config)).data,

  post: async <TResponse, TBody = unknown>(
    url: string,
    body: TBody,
    config: AxiosRequestConfig = {},
  ) =>
    (
      await axiosInstance.post<TResponse, AxiosResponse<TResponse>, TBody>(
        url,
        body,
        config,
      )
    ).data,

  put: async <TResponse, TBody = unknown>(
    url: string,
    body: TBody,
    config: AxiosRequestConfig = {},
  ) =>
    (
      await axiosInstance.put<TResponse, AxiosResponse<TResponse>, TBody>(
        url,
        body,
        config,
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
    requests.post<TAuthResponse>("/user/refresh", {}, { failSilently }), // [TODO] single attempt?
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
  createQuestion: ({
    prompt,
    hint,
    answer,
    categoryIds,
  }: TCreateNewQuestionRequest) =>
    requests.post<TQuestion>("/question", {
      prompt,
      hint,
      answer,
      questionCategoryIds: categoryIds,
    }),
  updateQuestion: ({
    id,
    prompt,
    hint,
    answer,
    confidence,
    categoryIds,
  }: TUpdateQuestionRequest) =>
    requests.put(`/question/${id}`, {
      prompt,
      hint,
      answer,
      confidence,
      questionCategoryIds: categoryIds,
    }),
  deleteQuestion: (id: string) => requests.delete(`/question/${id}`),
};

const Categories = {
  getCategories: () => requests.get<TCategory[]>("/category"),
  createCategory: ({ name }: TCreateCategory) =>
    requests.post<TCategory>("/category", { name }),
  updateCategory: ({ id, name }: TUpdateCategory) =>
    requests.put(`/category/${id}`, { name }),
  deleteCategory: (id: string) => requests.delete(`/category/${id}`),
};

const Quiz = {
  generateQuiz: (questionCategoryIds: string[], includeMastered: boolean) =>
    requests.post<TQuestion[]>("/quiz/generate", {
      questionCategoryIds,
      includeMastered,
    }),
  updateQuiz: async (
    updatedQuestions: { questionId: string; newConfidenceLevel: number }[],
  ) => {
    return requests.post("/quiz/update", { updatedQuestions });
  },
};

const api = {
  User,
  Questions,
  Categories,
  Quiz,
};

export default api;
