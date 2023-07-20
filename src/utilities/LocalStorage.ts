export const getLocalStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  } else {
    return null;
  }
};

export const setLocalStorageItem = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};
