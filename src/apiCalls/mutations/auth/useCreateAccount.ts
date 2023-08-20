import { customFetch } from "@/src/utilities/customFetch";
import { useMutation } from "@tanstack/react-query";

interface CreateAccountProps {
  email: string;
  password: string;
  name: string;
}

const CreateAccount = async ({ name, email, password }: CreateAccountProps) => {
  return await customFetch.post(
    "/auth/password/create_account",
    {
      name,
      email,
      password,
    },
    {
      requireToken: false,
    }
  );
};

const useCreateAccount = () => {
  return useMutation(CreateAccount);
};

export default useCreateAccount;
