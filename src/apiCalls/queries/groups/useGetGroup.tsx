import { Group } from "@/src/interfaces";
import { customFetch } from "@/src/utilities/customFetch";
import useAuthContext from "@/src/utilities/useAuthContext";
import { useQuery } from "@tanstack/react-query";

export const GetGroup = async (groupId?: string) => {
  return await customFetch.get(`/groups/${groupId}`);
};

export const KEY = "GROUP";

const useGetGroup = (groupId?: string) => {
  const { token } = useAuthContext();
  return useQuery<Group>([KEY, groupId], () => GetGroup(groupId), {
    enabled: !!token && !!groupId,
  });
};

export default useGetGroup;
