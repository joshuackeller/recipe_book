import { serverFetch } from "@/src/utilities/serverFetch";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import DeleteButton from "@/src/components/general/DeleteButton";
import SingleRecipePage from "@/src/pages/recipes/SingleRecipePage";

interface PageProps {
  params: {
    recipeId: string;
  };
}

const Page = async ({ params: { recipeId } }: PageProps) => {
  const recipe = await serverFetch.get(
    `http://localhost:3000/api/recipes/${recipeId}`
  );

  return <SingleRecipePage recipe={recipe?.data} />;
};

export default Page;
