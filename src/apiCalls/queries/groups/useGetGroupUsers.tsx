import { GroupUser } from "@/src/interfaces";
import { customFetch } from "@/src/utilities/customFetch";
import useAuthContext from "@/src/utilities/useAuthContext";
import { useQuery } from "@tanstack/react-query";

export const GetGroupUsers = async (groupId?: string) => {
  return await customFetch.get(`/groups/${groupId}/users`);
};

export const KEY = "GROUP_USERS";

const useGetGroupUsers = (groupId?: string) => {
  const { token } = useAuthContext();
  return useQuery<GroupUser[]>([KEY, groupId], () => GetGroupUsers(groupId), {
    enabled: !!token && !!groupId,
  });
};

export default useGetGroupUsers;
