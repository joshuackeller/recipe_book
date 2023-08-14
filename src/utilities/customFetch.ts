import Cookies from "js-cookie";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface CustomFetchOptions extends RequestInit {
  json?: boolean;
  requireToken: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const customFetch = async (
  url: string,
  method: HttpMethod,
  options?: CustomFetchOptions
) => {
  let token;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    if (!!token) {
      Cookies.set("token", token, { expires: 365 });
    }
  }
  if (!token) {
    token = Cookies.get("token");
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
    if (stringStatus.startsWith("4") || stringStatus.startsWith("5")) {
      if (data?.error?.name === "ZodError") {
        if (!!data?.error?.issues && data?.error?.issues?.length > 0) {
          if (!!data.error.issues?.[0]?.message) {
            throw new Error(data.error.issues[0].message);
          }
        }
      }
      throw new Error(
        !!data?.error
          ? typeof data.error === "string"
            ? data?.error
            : JSON.stringify(data.error)
          : "Error fetching data"
      );
    }

    return data;
  }
};

customFetch.get = (url: string, options?: CustomFetchOptions) =>
  customFetch(url, "GET", {
    ...options,
    requireToken: options?.requireToken ?? true,
  });
customFetch.post = (url: string, body?: any, options?: CustomFetchOptions) =>
  customFetch(url, "POST", {
    ...options,
    body: JSON.stringify(body),
    requireToken: options?.requireToken ?? true,
  });
customFetch.put = (url: string, body?: any, options?: CustomFetchOptions) =>
  customFetch(url, "PUT", {
    ...options,
    body: JSON.stringify(body),
    requireToken: options?.requireToken ?? true,
  });
customFetch.delete = (url: string, options?: CustomFetchOptions) =>
  customFetch(url, "DELETE", {
    ...options,
    requireToken: options?.requireToken ?? true,
  });
