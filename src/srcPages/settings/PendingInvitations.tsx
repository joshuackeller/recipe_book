"use client";

import useGetInvitations from "@/src/apiCalls/queries/invitations/useGetInvitations";
import PendingInvitationCard from "@/src/components/cards/PendingInvitationCard";

export const PendingInvitations = () => {
  const { data: invitations } = useGetInvitations();
  return (
    !!invitations &&
    invitations.length > 0 && (
      <div>
        <h2>Pending Invitations</h2>
        <div className="space-y-2">
          {invitations?.map((invitation) => (
            <PendingInvitationCard
              invitation={invitation}
              key={invitation.id}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default PendingInvitations;
