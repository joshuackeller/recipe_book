import { serverFetch } from "@/src/utilities/serverFetch";
import SingleRecipePage from "@/src/srcPages/recipes/SingleRecipePage";

interface PageProps {
  params: {
    recipeId: string;
  };
}

const Page = async ({ params: { recipeId } }: PageProps) => {
  let recipe = await serverFetch.get(`/recipes/${recipeId}`);

  return <SingleRecipePage recipe={recipe} />;

  // if (!!recipe?.data) {
  //   return <SingleRecipePage recipe={recipe?.data}  />;
  // } else {
  //   return (
  //     <div>
  //       <div>Could not find recipe</div>
  //       {recipe && <div>recipe: {recipe}</div>}
  //       {errorMessage && <div>error: {errorMessage.toString()}</div>}
  //     </div>
  //   );
  // }
};

export default Page;
