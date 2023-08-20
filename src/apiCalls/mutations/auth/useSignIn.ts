import { customFetch } from "@/src/utilities/customFetch";
import { useMutation } from "@tanstack/react-query";

interface SignInProps {
  email: string;
  password: string;
}

const SignIn = async ({ email, password }: SignInProps) => {
  return await customFetch.post(
    "/auth/password/sign_in",
    {
      email,
      password,
    },
    {
      requireToken: false,
    }
  );
};

const useSignIn = () => {
  return useMutation(SignIn);
};

export default useSignIn;
