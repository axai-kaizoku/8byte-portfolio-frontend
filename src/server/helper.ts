import axios, { AxiosError } from "axios";

export type APIResult<T> = { error: boolean; data?: T; status?: number | string; message?: string };

// export const BASEURL = "https://dummyjson.com/users";
export const BASEURL = "https://eightbyte-portfolio-backend.onrender.com";

export async function callAPI<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body?: unknown,
  headers?: Record<string, string>
): Promise<APIResult<T>> {
  try {
    const response = await axios({
      url,
      method,
      data: method !== "GET" ? body : undefined,
      headers,
    });

    return {
      error: false,
      data: response.data as T,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        error: true,
        status: error?.response?.status ?? 500,
        message: error?.response?.data?.message ?? error.message ?? "API request failed",
      };
    }

    return {
      error: true,
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
