export const dynamic = "force-dynamic";
import HydrateClient from "@/src/components/wrappers/queryClient/HydrateClient";
import HomePage from "@/src/srcPages/HomePage";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import {
  GetRecipes,
  KEY as RECIPES,
} from "@/src/apiCalls/queries/recipes/useGetRecipes";
import { GetTags, KEY as TAGS } from "@/src/apiCalls/queries/tags/useGetTags";

export default async function Home() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery([RECIPES], () => {
      return GetRecipes({}) ?? [];
    }),
    queryClient.prefetchQuery([TAGS], () => {
      return GetTags({}) ?? [];
    }),
  ]);

  const state = dehydrate(queryClient);

  return (
    <HydrateClient state={state}>
      <HomePage />
    </HydrateClient>
  );
}
