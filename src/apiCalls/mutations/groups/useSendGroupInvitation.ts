import { customFetch } from "@/src/utilities/customFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SendGroupInviteProps {
  groupId: string;
  name: string;
  email: string;
}

const SendGroupInvite = async ({
  groupId,
  name,
  email,
}: SendGroupInviteProps) => {
  const response = await customFetch.post(`/groups/${groupId}/invitations`, {
    name,
    email,
  });
  return response;
};

const useSendGroupInvite = () => {
  const queryClient = useQueryClient();
  return useMutation(SendGroupInvite);
};

export default useSendGroupInvite;
