import { Tag } from "@/src/interfaces";
import { customFetch } from "@/src/utilities/customFetch";
import useAuthContext from "@/src/utilities/useAuthContext";
import { useQuery } from "@tanstack/react-query";

interface GetTagsProps {
  search?: string;
}

export const GetTags = async ({ search }: GetTagsProps) => {
  return await customFetch.get("/tags", {
    params: {
      search,
    },
  });
};

export const KEY = "TAGS";

const useGetTags = (search?: string) => {
  const { token } = useAuthContext();
  return useQuery<Tag[]>([KEY, search], () => GetTags({ search }), {
    enabled: !!token,
  });
};

export default useGetTags;
