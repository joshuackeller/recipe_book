import { customFetch } from "@/src/utilities/customFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SendGroupInviteProps {
  groupId: string;
  name: string;
  phone: string;
}

const SendGroupInvite = async ({
  groupId,
  name,
  phone,
}: SendGroupInviteProps) => {
  const response = await customFetch.post(`/groups/${groupId}/invitations`, {
    name,
    phone,
  });
  return response;
};

const useSendGroupInvite = () => {
  const queryClient = useQueryClient();
  return useMutation(SendGroupInvite);
};

export default useSendGroupInvite;
