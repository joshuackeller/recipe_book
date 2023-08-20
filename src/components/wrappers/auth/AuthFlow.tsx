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
import TextInput from "../../base/fields/TextInput";
import Card from "../../base/Card";
import Button from "../../base/Button";
import Cookies from "js-cookie";
import useCreateAccount from "@/src/apiCalls/mutations/auth/useCreateAccount";
import useSignIn from "@/src/apiCalls/mutations/auth/useSignIn";

export enum AuthFlow {
  sign_in = "sign_in",
  create_account = "create_account",
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
    !!searchAuthFlow ? searchAuthFlow : AuthFlow.sign_in
  );
  useEffect(() => {
    setAuthFlow(!!searchAuthFlow ? searchAuthFlow : AuthFlow.sign_in);
  }, [searchAuthFlow]);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate: createAccount, isLoading: creatingAccount } =
    useCreateAccount();

  const handleCreateAccount = (e: FormEvent) => {
    e.preventDefault();
    createAccount(
      { email, name, password },
      {
        onSuccess: (response) => {
          if (!!response?.token) {
            Cookies.set("token", response.token, { expires: 365 });
            setLocalStorageItem("token", response.token);
            setToken(response.token);
          }
        },
      }
    );
  };

  const { mutate: signIn, isLoading: signingIn } = useSignIn();

  const handleSignin = (e: FormEvent) => {
    e.preventDefault();
    signIn(
      {
        email,
        password,
      },
      {
        onSuccess: (response) => {
          if (!!response?.token) {
            Cookies.set("token", response.token, { expires: 365 });
            setLocalStorageItem("token", response.token);
            setToken(response.token);
          }
        },
      }
    );
  };

  switch (authFlow) {
    case AuthFlow.create_account:
      return (
        <div className="flex justify-center py-20">
          <Card className="p-5 w-full max-w-sm">
            <form onSubmit={handleCreateAccount} className="space-y-2">
              <h2 className="text-center mb-2">Create Account</h2>
              <TextInput
                inputClassName="w-full"
                name="name"
                label="Name"
                type="text"
                value={name}
                setValue={setName}
              />
              <TextInput
                inputClassName="w-full"
                name="email"
                label="Email"
                type="email"
                value={email}
                setValue={setEmail}
              />
              <TextInput
                inputClassName="w-full"
                name="password"
                label="Password"
                type="password"
                value={password}
                setValue={setPassword}
              />
              <Button
                isLoading={creatingAccount}
                disabled={creatingAccount}
                className=""
                type="submit"
              >
                Create Account
              </Button>
            </form>
            <div
              className="pt-4 pb-1 text-center text-xs cursor-pointer"
              onClick={() => {
                router.push("/?authFlow=sign_in");
              }}
            >
              or Sign In
            </div>
          </Card>
        </div>
      );
    case AuthFlow.sign_in:
      return (
        <div className="flex justify-center py-20">
          <Card className="p-5 w-full max-w-sm">
            <form onSubmit={handleSignin} className="space-y-2">
              <h2 className="text-center mb-2">Sign In</h2>
              <TextInput
                className="w-full"
                name="email"
                label="Email"
                type="text"
                value={email}
                setValue={setEmail}
              />
              <TextInput
                className="w-full"
                name="password"
                label="Password"
                type="password"
                value={password}
                setValue={setPassword}
              />
              <Button isLoading={signingIn} disabled={signingIn} type="submit">
                Sign In
              </Button>
            </form>
            <div
              className="pt-4 pb-1 text-center text-xs cursor-pointer"
              onClick={() => {
                router.push("/?authFlow=create_account");
              }}
            >
              or Create Account
            </div>
          </Card>
        </div>
      );
  }
};

export default AuthFlowItems;
