"use client";

import { ReactNode, useEffect, useState, createContext } from "react";
import { getLocalStorageItem } from "@/src/utilities/LocalStorage";
import AuthFlowItems from "./AuthFlow";
import Loading from "../../base/Loading";
import Cookies from "js-cookie";

export interface AuthContext {
  token?: string;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

interface AuthWrapper {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapper) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    if (!token) {
      const _token = getLocalStorageItem("token");
      if (!!_token) setToken(_token);
    }
    setLoading(false);
  }, []);

  const signOut = () => {
    if (typeof window !== "undefined") {
      Cookies.remove("token");
      localStorage.removeItem("token");
      setToken(undefined);
    }
  };

  return (
    <AuthContext.Provider value={{ token, signOut }}>
      {loading ? (
        <Loading className="my-10" />
      ) : !!token ? (
        <>{children}</>
      ) : (
        <AuthFlowItems setToken={setToken} />
      )}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
