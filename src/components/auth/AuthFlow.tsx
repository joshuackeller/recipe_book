"use client";

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { setLocalStorageItem } from "@/src/utilities/LocalStorage";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { clientFetch } from "@/src/utilities/clientFetch";
import TextInput from "../base/fields/TextInput";
import Card from "../base/Card";
import Button from "../base/Button";
import Cookies from "js-cookie";

export enum AuthFlow {
  signin = "signin",
  signup = "signup",
  request_code = "request_code",
}

interface AuthFlowProps {
  setToken: Dispatch<SetStateAction<any>>;
}

const AuthFlowItems = ({ setToken }: AuthFlowProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchAuthFlow = searchParams?.get("authFlow") as AuthFlow | null;
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
      .post(
        "/auth/request_code",
        {
          phone: "+1" + phone,
        },
        {
          requireToken: false,
        }
      )
      .then(() => {
        router.push(`${pathname}?authFlow=${AuthFlow.signin}`);
      });
  };

  const handleSignin = (e: FormEvent) => {
    e.preventDefault();
    clientFetch
      .post(
        "/auth/sign_in",
        {
          phone: "+1" + phone,
          code,
        },
        {
          requireToken: false,
        }
      )
      .then(async (response) => {
        if (!!response?.token) {
          Cookies.set("token", response.token, { expires: 365 });
          setLocalStorageItem("token", response.token);
          setToken(response.token);
        }
      });
  };

  switch (authFlow) {
    case AuthFlow.request_code:
      return (
        <div className="flex justify-center py-20">
          <Card className="p-5 w-full max-w-sm">
            <form onSubmit={handleRequestCode} className="space-y-2">
              <h2 className="text-center mb-2">Request Code</h2>
              <TextInput
                // error={!!phone && !/^[0-9]{10}$/.test(phone)}

                inputClassName="w-full"
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
            <form onSubmit={handleSignin} className="space-y-2">
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
          </Card>
        </div>
      );
  }
};

export default AuthFlowItems;
