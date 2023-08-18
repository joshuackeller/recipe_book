import { Group, Recipe } from "@/src/interfaces";
import { customFetch } from "@/src/utilities/customFetch";
import useAuthContext from "@/src/utilities/useAuthContext";
import { useQuery } from "@tanstack/react-query";

export const GetGroups = async (): Promise<Group[]> => {
  return await customFetch.get("/groups");
};

export const KEY = "GROUPS";

const useGetGroups = () => {
  const { token } = useAuthContext();
  return useQuery<Group[]>([KEY], GetGroups, {
    enabled: !!token,
  });
};

export default useGetGroups;
