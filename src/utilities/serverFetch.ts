import { cookies } from "next/headers";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ServerFetchOptions extends RequestInit {
  json?: boolean;
}

export const serverFetch = async (
  url: string,
  method: HttpMethod,
  options?: ServerFetchOptions
) => {
  const tokenCookie = cookies().get("token");
  const token = tokenCookie?.value;

  const response = await fetch(url, {
    method,
    ...options,
    headers: {
      ...(options?.headers || {}),
      "Content-Type": "application/json",
      ...(token ? { Authorization: token } : {}),
    },
  });
  const data =
    options?.json === false ? await response.text() : await response.json();

  return data;
};

serverFetch.get = (url: string, options?: ServerFetchOptions) =>
  serverFetch(url, "GET", options);
serverFetch.post = (url: string, body?: any, options?: ServerFetchOptions) =>
  serverFetch(url, "POST", { ...options, body: JSON.stringify(body) });
serverFetch.put = (url: string, body?: any, options?: ServerFetchOptions) =>
  serverFetch(url, "PUT", { ...options, body: JSON.stringify(body) });
serverFetch.delete = (url: string, options?: ServerFetchOptions) =>
  serverFetch(url, "DELETE", options);
