import { GroupInvite } from "@/src/interfaces";
import { customFetch } from "@/src/utilities/customFetch";
import useAuthContext from "@/src/utilities/useAuthContext";
import { useQuery } from "@tanstack/react-query";

export const GetGroupInvitations = async (groupId?: string) => {
  return await customFetch.get(`/groups/${groupId}/invitations`);
};

export const KEY = "INVITATIONS";

const useGetGroupInvitations = (groupId?: string) => {
  const { token } = useAuthContext();
  return useQuery<GroupInvite[]>(
    [KEY, groupId],
    () => GetGroupInvitations(groupId),
    {
      enabled: !!token && !!groupId,
    }
  );
};

export default useGetGroupInvitations;
