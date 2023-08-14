import { customFetch } from "@/src/utilities/customFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEY as INVITATIONS } from "../../queries/groups/useGetGroupInvitations";
import { GroupInvite } from "@/src/interfaces";

interface SendInviteProps {
  groupId: string;
  name: string;
  phone: string;
}

const SendInvite = async ({ groupId, name, phone }: SendInviteProps) => {
  const response = await customFetch.post(`/groups/${groupId}/invitations`, {
    name,
    phone,
  });
  return response;
};

const useSendInvite = () => {
  const queryClient = useQueryClient();
  return useMutation(SendInvite);
};

export default useSendInvite;
