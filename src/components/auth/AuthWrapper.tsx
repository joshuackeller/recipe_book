"use client";

import { ReactNode, useEffect, useState } from "react";
import { getLocalStorageItem } from "@/src/utilities/LocalStorage";
import AuthFlowItems from "./AuthFlow";
import Loading from "../base/Loading";

interface AuthWrapper {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapper) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (!token) {
      const _token = getLocalStorageItem("token");
      if (!!_token) setToken(_token);
    }
    setLoading(false);
  }, []);

  if (loading) return <Loading className="my-10" />;
  if (!!token) return <>{children}</>;
  else return <AuthFlowItems setToken={setToken} />;
};

export default AuthWrapper;
