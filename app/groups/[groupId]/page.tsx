import { serverFetch } from "@/src/utilities/serverFetch";
import SingleRecipePage from "@/src/srcPages/recipes/SingleRecipePage";
import SingleGroupPage from "@/src/srcPages/groups/SingleGroupPage";

interface PageProps {
  params: {
    groupId: string;
  };
}

const Page = async ({ params: { groupId } }: PageProps) => {
  let group = await serverFetch.get(`/groups/${groupId}`);

  return <SingleGroupPage group={group} />;
};

export default Page;
