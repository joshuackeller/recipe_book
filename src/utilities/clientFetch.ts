import Cookies from "js-cookie";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ClientFetchOptions extends RequestInit {
  json?: boolean;
  requireToken: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const clientFetch = async (
  url: string,
  method: HttpMethod,
  options?: ClientFetchOptions
) => {
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    if (!!token) {
      Cookies.set("token", token, { expires: 365 });
    }
  }

  if (!!token || options?.requireToken === false) {
    const response = await fetch(BASE_URL + url, {
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

    const stringStatus = response.status.toString();
    if (stringStatus.startsWith("4")) {
      throw new Error(data?.error ?? "Error fetching data");
    }

    return data;
  }
};

clientFetch.get = (url: string, options?: ClientFetchOptions) =>
  clientFetch(url, "GET", {
    ...options,
    requireToken: options?.requireToken ?? true,
  });
clientFetch.post = (url: string, body?: any, options?: ClientFetchOptions) =>
  clientFetch(url, "POST", {
    ...options,
    body: JSON.stringify(body),
    requireToken: options?.requireToken ?? true,
  });
clientFetch.put = (url: string, body?: any, options?: ClientFetchOptions) =>
  clientFetch(url, "PUT", {
    ...options,
    body: JSON.stringify(body),
    requireToken: options?.requireToken ?? true,
  });
clientFetch.delete = (url: string, options?: ClientFetchOptions) =>
  clientFetch(url, "DELETE", {
    ...options,
    requireToken: options?.requireToken ?? true,
  });
