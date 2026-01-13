import { TIME_UNITS } from "@/app/constants";
import type {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosInstance,
} from "axios";
import axios, { AxiosError } from "axios";
import { logoutAndRedirect } from "@/lib/authActions";
import { type ApiError, type ApiResponse, type IParams } from "../types";

type RequestBuilderProps<T> = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  service: string;
  id?: string | number;
  body?: T;
  params?: IParams;
  path?: string;
};

export class ClientAPI {
  private static instance: ClientAPI;
  private client: AxiosInstance;

  baseUrl: string;
  timeout: number = 10 * TIME_UNITS.seconds;
  withCredentials: boolean = false;

  private constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.client = this.createClient();
  }

  public static getInstance(baseUrl: string): ClientAPI {
    if (!ClientAPI.instance) {
      ClientAPI.instance = new ClientAPI(baseUrl);
    }
    return ClientAPI.instance;
  }

  private createClient(): AxiosInstance {
    const client = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      withCredentials: this.withCredentials,
      headers: {
        "Content-Type": "application/json",
      },
    });

    client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // const token = useAuthStore.getState().accessToken;
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error: AxiosError) => Promise.reject(this.apiError(error))
    );

    client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const normalizedError = this.apiError(error);

        if (error.response?.status === 401) {
          logoutAndRedirect();
        }

        return Promise.reject(normalizedError);
      }
    );
    return client;
  }

  private apiError(error: AxiosError): ApiError {
    interface ApiErrorData {
      message?: string;
    }
    return {
      message:
        (error.response?.data as ApiErrorData)?.message ||
        error.message ||
        "Error desconocido",
      status: error.response?.status ?? error.code,
      data: error.response?.data,
      originalError: error,
    };
  }

  private apiResponse<T>(response: AxiosResponse): ApiResponse<T> {
    return {
      data: response.data,
      status: response.status,
      message: response.statusText,
    };
  }

  get http(): AxiosInstance {
    return this.client;
  }

  async requestBuilder<T>({
    method,
    service,
    id,
    body,
    params,
    path,
  }: RequestBuilderProps<T>): Promise<ApiResponse<T>> {
    let serviceUrl = `/${service}`;

    if (path) {
      serviceUrl += path;
    }

    const url = id ? `${serviceUrl}/${id}` : serviceUrl;

    if (!url) {
      throw new Error("URL no válida para la solicitud");
    }

    const response = await this.client.request<T>({
      method,
      url,
      ...(method === "POST" || method === "PUT" || method === "PATCH"
        ? { data: body }
        : {}),
      params,
    });

    return this.apiResponse<T>(response);
  }
}
