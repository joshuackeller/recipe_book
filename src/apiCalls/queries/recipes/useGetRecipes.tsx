import { Recipe } from "@/src/interfaces";
import { customFetch } from "@/src/utilities/customFetch";
import useAuthContext from "@/src/utilities/useAuthContext";
import { useQuery } from "@tanstack/react-query";

interface GetRecipesProps {
  search?: string;
  tagIds?: number[];
}

export const GetRecipes = async ({ search, tagIds }: GetRecipesProps) => {
  return await customFetch.get("/recipes", {
    params: {
      search,
      tagIds,
    },
  });
};

export const KEY = "RECIPES";

const useGetRecipes = (search?: string, tagIds?: number[]) => {
  const { token } = useAuthContext();
  return useQuery<Recipe[]>(
    [KEY, search, tagIds],
    () => GetRecipes({ search, tagIds }),
    {
      enabled: !!token,
    }
  );
};

export default useGetRecipes;
