import { serverFetch } from "@/src/utilities/serverFetch";
import SingleRecipePage from "@/src/srcPages/recipes/SingleRecipePage";

interface PageProps {
  params: {
    recipeId: string;
  };
}

const Page = async ({ params: { recipeId } }: PageProps) => {
  let recipe = await serverFetch.get(`/recipes/${recipeId}`);

  return <SingleRecipePage recipe={recipe?.data} />;
};

export default Page;
