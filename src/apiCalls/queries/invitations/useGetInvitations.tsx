import { GroupInvite, Recipe } from "@/src/interfaces";
import { customFetch } from "@/src/utilities/customFetch";
import useAuthContext from "@/src/utilities/useAuthContext";
import { useQuery } from "@tanstack/react-query";

export const GetInvitations = async (): Promise<GroupInvite[]> => {
  return await customFetch.get("/invitations");
};

export const KEY = "INVITATIONS";

const useGetInvitations = () => {
  const { token } = useAuthContext();
  return useQuery<GroupInvite[]>([KEY], GetInvitations, {
    enabled: !!token,
  });
};

export default useGetInvitations;
