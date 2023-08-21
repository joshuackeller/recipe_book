export const dynamic = "force-dynamic";
import SingleGroupPage from "@/src/srcPages/groups/SingleGroupPage";
import HydrateClient from "@/src/components/wrappers/queryClient/HydrateClient";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import {
  GetGroup,
  KEY as GROUP,
} from "@/src/apiCalls/queries/groups/useGetGroup";
import {
  GetGroupInvitations,
  KEY as INVITATIONS,
} from "@/src/apiCalls/queries/groups/useGetGroupInvitations";
import {
  GetGroupUsers,
  KEY as GROUP_USERS,
} from "@/src/apiCalls/queries/groups/useGetGroupUsers";

interface PageProps {
  params: {
    groupId: string;
  };
}

const Page = async ({ params: { groupId } }: PageProps) => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery([GROUP, groupId], () => GetGroup(groupId)),
    queryClient.prefetchQuery([INVITATIONS, groupId], () =>
      GetGroupInvitations(groupId)
    ),
    queryClient.prefetchQuery([GROUP_USERS, groupId], () =>
      GetGroupUsers(groupId)
    ),
  ]);

  const state = dehydrate(queryClient);

  return (
    <HydrateClient state={state}>
      <SingleGroupPage groupId={groupId} />
    </HydrateClient>
  );
};

export default Page;
