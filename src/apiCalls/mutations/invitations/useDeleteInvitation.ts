import { customFetch } from "@/src/utilities/customFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEY as INVITATIONS } from "../../queries/invitations/useGetInvitations";

interface DeleteInvitationProps {
  invitationId: number;
}

const DeleteInvitation = async ({ invitationId }: DeleteInvitationProps) => {
  return await customFetch.delete(`/invitations/${invitationId}`);
};

const useDeleteInvitation = (invitationId: number) => {
  const queryClient = useQueryClient();

  return useMutation(() => DeleteInvitation({ invitationId }), {
    onSuccess: () => {
      queryClient.setQueryData([INVITATIONS], (data: any[] | undefined) => {
        const newData: any[] = JSON.parse(JSON.stringify(data));
        if (!!newData && newData.length > 0) {
          const index = newData?.findIndex((i) => invitationId === i.id);
          if (index !== -1) {
            newData.splice(index, 1);
          }
        }
        return newData;
      });
    },
  });
};

export default useDeleteInvitation;
