import { serverFetch } from "@/src/utilities/serverFetch";
import SingleRecipePage from "@/src/srcPages/recipes/SingleRecipePage";

interface PageProps {
  params: {
    recipeId: string;
  };
}

const Page = async ({ params: { recipeId } }: PageProps) => {
  let errorMessage;
  let recipe = await serverFetch.get(`/recipes/${recipeId}`);
  try {
    await serverFetch.get(`/recipes/${recipeId}`);
  } catch (error) {
    errorMessage = error;
  }

  return <SingleRecipePage recipe={recipe} error={errorMessage} />;

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
