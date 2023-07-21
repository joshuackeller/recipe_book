"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/src/utilities/LocalStorage";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { clientFetch } from "@/src/utilities/clientFetch";
import TextInput from "../base/TextInput";
import Card from "../base/Card";
import Button from "../base/Button";

export enum AuthFlow {
  signin = "signin",
  signup = "signup",
  request_code = "request_code",
}

interface AuthWrapper {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapper) => {
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    const _token = getLocalStorageItem("token");
    if (!!_token) setToken(_token);
  }, []);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchAuthFlow = searchParams.get("authFlow") as AuthFlow | null;
  const [authFlow, setAuthFlow] = useState<AuthFlow>(
    !!searchAuthFlow ? searchAuthFlow : AuthFlow.request_code
  );
  useEffect(() => {
    setAuthFlow(!!searchAuthFlow ? searchAuthFlow : AuthFlow.request_code);
  }, [searchAuthFlow]);

  const [phone, setPhone] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const handleRequestCode = (e: FormEvent) => {
    e.preventDefault();
    clientFetch
      .post("/api/auth/request_code", {
        phone: "+1" + phone,
      })
      .then(() => {
        router.push(`/${pathname}?authFlow=${AuthFlow.signin}`);
      });
  };

  const handleSignin = (e: FormEvent) => {
    e.preventDefault();
    clientFetch
      .post("/api/auth/sign_in", {
        phone: "+1" + phone,
        code,
      })
      .then((response) => {
        if (response?.data?.token) {
          setLocalStorageItem("token", response?.data?.token);
          setToken(response?.data?.token);
        }
      });
  };

  if (!!token) return <>{children}</>;
  switch (authFlow) {
    case AuthFlow.request_code:
      return (
        <div className="flex justify-center py-20">
          <Card className="p-5 w-full max-w-md">
            <form onSubmit={handleRequestCode} className="space-y-2">
              <h2 className="text-center mb-2">Request Code</h2>
              <TextInput
                // error={!!phone && !/^[0-9]{10}$/.test(phone)}
                className="w-full"
                name="Phone"
                label="Phone"
                type="text"
                value={phone}
                setValue={setPhone}
              />
              <Button type="submit">Request Code</Button>
            </form>
          </Card>
        </div>
      );
    case AuthFlow.signin:
      return (
        <div className="flex justify-center py-20">
          <Card className="p-5 w-full max-w-sm">
            <form onSubmit={handleSignin}>
              <h2 className="text-center mb-2">Sign In</h2>
              <TextInput
                //   error={!!phone && !/^[0-9]{10}$/.test(phone)}
                className="w-full"
                name="Phone"
                label="Phone"
                type="text"
                value={phone}
                setValue={setPhone}
              />
              <TextInput
                className="w-full"
                name="code"
                label="Code"
                type="text"
                value={code}
                setValue={setCode}
              />
              <Button type="submit">Sign In</Button>
            </form>
          </Card>
        </div>
      );
    case AuthFlow.signup:
      return (
        <div className="flex justify-center py-20">
          <Card className="p-5 w-full max-w-md">
            <h2 className="text-center mb-2">Sign Up</h2>
            <TextInput
              className="w-full"
              name="Phone"
              label="Phone"
              type="text"
              value={phone}
              setValue={setPhone}
            />
          </Card>
        </div>
      );
  }
};

export default AuthWrapper;