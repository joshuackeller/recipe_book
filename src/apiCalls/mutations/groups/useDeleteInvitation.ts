import { customFetch } from "@/src/utilities/customFetch";
import { useMutation } from "@tanstack/react-query";

interface DeleteInvitationProps {
  groupId: number;
  invitationId: number;
}

const DeleteInvitation = async ({
  groupId,
  invitationId,
}: DeleteInvitationProps) => {
  return await customFetch.delete(
    `/groups/${groupId}/invitations/${invitationId}`
  );
};

const useDeleteInvitation = () => {
  return useMutation(DeleteInvitation);
};

export default useDeleteInvitation;
