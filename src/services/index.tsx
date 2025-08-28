/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  ResponseType,
} from "axios";

interface RequestOptions {
  baseURL?: string;
  headers?: Record<string, string>;
  token?: string;
  withCredentials?: boolean; // ✅ Cho phép gửi cookie
  [key: string]: any;
}

const TIMEOUT_DURATION = 15 * 1000;

// Singleton instance
const defaultAxiosInstance: AxiosInstance = axios.create({
  timeout: TIMEOUT_DURATION,
  withCredentials: true, // ✅ Bật mặc định
});

// Response handler
const handleResponse = <T,>(response: AxiosResponse<T>): T => {
  return response.data;
};

// Error handler
const handleError = (error: AxiosError) => {
  if (error.response?.data) {
    return Promise.reject(error.response.data);
  }
  return Promise.reject({ message: error.message || "Unknown error" });
};

// Attach interceptors
defaultAxiosInstance.interceptors.response.use(handleResponse, handleError);

// Utility (optional, vẫn giữ nếu muốn tạo instance riêng)
const getAxiosInstance = (baseURL?: string): AxiosInstance => {
  if (baseURL) {
    const instance = axios.create({
      baseURL,
      timeout: TIMEOUT_DURATION,
      withCredentials: true, // ✅ Đảm bảo bật trong instance riêng
    });
    instance.interceptors.response.use(handleResponse, handleError);
    return instance;
  }
  return defaultAxiosInstance;
};

// Gộp headers và token
const buildHeaders = (options?: RequestOptions): Record<string, string> => {
  const headers = options?.headers || {};
  if (options?.token) {
    headers["Authorization"] = `Bearer ${options.token}`;
  }
  return headers;
};

// === HTTP Methods ===
async function get<Params, Result>(
  url: string,
  params?: Params,
  options?: RequestOptions,
  responseType?: ResponseType
): Promise<Result> {
  const instance = getAxiosInstance(options?.baseURL);
  return instance.get(url, {
    params,
    headers: buildHeaders(options),
    responseType,
    withCredentials: options?.withCredentials ?? true, 
  });
}

async function post<Body, Result>(
  url: string,
  data?: Body,
  options?: RequestOptions
): Promise<Result> {
  const instance = getAxiosInstance(options?.baseURL);
  return instance.post(url, data, {
    baseURL: options?.baseURL,
    headers: buildHeaders(options),
    withCredentials: options?.withCredentials ?? true, 
  });
}

async function put<Body, Result>(
  url: string,
  data?: Body,
  options?: RequestOptions
): Promise<Result> {
  const instance = getAxiosInstance(options?.baseURL);
  return instance.put(url, data, {
    baseURL: options?.baseURL,
    headers: buildHeaders(options),
    withCredentials: options?.withCredentials ?? true, 
  });
}

async function remove<Body, Result>(
  url: string,
  data?: Body,
  options?: RequestOptions
): Promise<Result> {
  const instance = getAxiosInstance(options?.baseURL);
  return instance.delete(url, {
    data,
    baseURL: options?.baseURL,
    headers: buildHeaders(options),
    withCredentials: options?.withCredentials ?? true,
  });
}

// === Exported Axios object ===
const Axios = {
  get,
  post,
  put,
  remove,
};

export { Axios };
