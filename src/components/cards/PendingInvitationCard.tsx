"use client";

import { GroupInvite } from "@/src/interfaces";
import Button from "../base/Button";
import useAcceptInvitation from "@/src/apiCalls/mutations/invitations/useAcceptInvitation";
import useDeleteInvitation from "@/src/apiCalls/mutations/invitations/useDeleteInvitation";

interface PendingInvitationCardProps {
  invitation: GroupInvite;
}

const PendingInvitationCard = ({ invitation }: PendingInvitationCardProps) => {
  const { mutate: acceptInvitation, isLoading: acceptingInvitation } =
    useAcceptInvitation(invitation.id);
  const { mutate: deleteInvitation, isLoading: deletingInvitation } =
    useDeleteInvitation(invitation.id);

  return (
    <div className="p-3 border-2 border-black rounded-lg sm:flex items-center justify-between">
      <div className="mb-2 sm:mb-0">{invitation.group?.name}</div>
      <div className="sm:flex grid gap-1">
        <Button
          className="w-full"
          onClick={() => acceptInvitation()}
          isLoading={acceptingInvitation}
          disabled={acceptingInvitation}
        >
          Accept
        </Button>
        <Button
          onClick={() => deleteInvitation()}
          isLoading={deletingInvitation}
          disabled={deletingInvitation}
          className="bg-yellow-500 hover:bg-yellow-500/80"
        >
          Decline
        </Button>
      </div>
    </div>
  );
};

export default PendingInvitationCard;
