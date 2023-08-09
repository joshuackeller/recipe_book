type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ClientFetchOptions extends RequestInit {
  json?: boolean;
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
  }

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

  return data;
};

clientFetch.get = (url: string, options?: ClientFetchOptions) =>
  clientFetch(url, "GET", options);
clientFetch.post = (url: string, body?: any, options?: ClientFetchOptions) =>
  clientFetch(url, "POST", { ...options, body: JSON.stringify(body) });
clientFetch.put = (url: string, body?: any, options?: ClientFetchOptions) =>
  clientFetch(url, "PUT", { ...options, body: JSON.stringify(body) });
clientFetch.delete = (url: string, options?: ClientFetchOptions) =>
  clientFetch(url, "DELETE", options);
