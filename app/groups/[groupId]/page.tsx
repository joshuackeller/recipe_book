import { serverFetch } from "@/src/utilities/serverFetch";
import SingleRecipePage from "@/src/srcPages/recipes/SingleRecipePage";

interface PageProps {
  params: {
    groupId: string;
  };
}

const Page = async ({ params: { groupId } }: PageProps) => {
  let recipe = await serverFetch.get(`/groups/${groupId}`);

  return <SingleRecipePage recipe={recipe} />;
};

export default Page;
