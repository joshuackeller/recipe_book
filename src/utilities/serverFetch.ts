import { cookies } from "next/headers";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ServerFetchOptions extends RequestInit {
  json?: boolean;
  requireToken: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const serverFetch = async (
  url: string,
  method: HttpMethod,
  options?: ServerFetchOptions
) => {
  const tokenCookie = cookies().get("token");
  const token = tokenCookie?.value;

  if (!!token || options?.requireToken === false) {
    const response = await fetch(BASE_URL + url, {
      method,
      ...options,
      headers: {
        ...(options?.headers || {}),
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
      cache: "no-store",
    });
    const data =
      options?.json === false ? await response.text() : await response.json();

    const stringStatus = response.status.toString();
    if (stringStatus.startsWith("4")) {
      throw new Error(data?.error ?? "Error fetching data");
    }

    return data;
  }
};

serverFetch.get = (url: string, options?: ServerFetchOptions) =>
  serverFetch(url, "GET", {
    ...options,
    requireToken: options?.requireToken ?? true,
  });
serverFetch.post = (url: string, body?: any, options?: ServerFetchOptions) =>
  serverFetch(url, "POST", {
    ...options,
    body: JSON.stringify(body),
    requireToken: options?.requireToken ?? true,
  });
serverFetch.put = (url: string, body?: any, options?: ServerFetchOptions) =>
  serverFetch(url, "PUT", {
    ...options,
    body: JSON.stringify(body),
    requireToken: options?.requireToken ?? true,
  });
serverFetch.delete = (url: string, options?: ServerFetchOptions) =>
  serverFetch(url, "DELETE", {
    ...options,
    requireToken: options?.requireToken ?? true,
  });
