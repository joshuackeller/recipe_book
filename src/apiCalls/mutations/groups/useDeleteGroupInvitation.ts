import { customFetch } from "@/src/utilities/customFetch";
import { useMutation } from "@tanstack/react-query";

interface DeleteGroupInvitationProps {
  groupId: number;
  invitationId: number;
}

const DeleteGroupInvitation = async ({
  groupId,
  invitationId,
}: DeleteGroupInvitationProps) => {
  return await customFetch.delete(
    `/groups/${groupId}/invitations/${invitationId}`
  );
};

const useDeleteGroupInvitation = () => {
  return useMutation(DeleteGroupInvitation);
};

export default useDeleteGroupInvitation;
