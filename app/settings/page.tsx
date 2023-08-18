import {
  GetGroups,
  KEY as GROUPS,
} from "@/src/apiCalls/queries/groups/useGetGroups";
import {
  GetInvitations,
  KEY as INVITATIONS,
} from "@/src/apiCalls/queries/invitations/useGetInvitations";
import PendingInvitations from "@/src/srcPages/settings/PendingInvitations";
import BackButton from "@/src/components/general/BackButton";
import SignOutButton from "@/src/components/general/SignOutButton";
import HydrateClient from "@/src/components/wrappers/queryClient/HydrateClient";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import MyGroups from "@/src/srcPages/settings/MyGroups";

const Page = async () => {
  const queryClient = new QueryClient();

  const groups = await GetGroups();
  const invitations = await GetInvitations();

  queryClient.prefetchQuery([GROUPS], () => groups ?? []);
  queryClient.prefetchInfiniteQuery([INVITATIONS], () => invitations ?? []);

  const state = dehydrate(queryClient);

  return (
    <HydrateClient state={state}>
      <BackButton />
      {!!invitations && invitations.length > 0 && <PendingInvitations />}

      {!!groups && groups.length > 0 && <MyGroups />}
      <div className="mt-24 float-right">
        <SignOutButton />
      </div>
    </HydrateClient>
  );
};

export default Page;
