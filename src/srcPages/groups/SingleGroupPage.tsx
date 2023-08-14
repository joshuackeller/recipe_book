"use client";

import Button from "@/src/components/base/Button";
import Modal from "@/src/components/base/Modal";
import { GroupInvite, GroupUser, User } from "@/src/interfaces";
import { clientFetch } from "@/src/utilities/clientFetch";
import {
  ClockIcon,
  MinusCircleIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import BackButton from "@/src/components/general/BackButton";
import TextInput from "@/src/components/base/fields/TextInput";
import useGetGroup from "@/src/apiCalls/queries/groups/useGetGroup";
import useGetGroupInvitations from "@/src/apiCalls/queries/groups/useGetGroupInvitations";
import useSendInvite from "@/src/apiCalls/mutations/groups/useSendInvitation";
import { useQueryClient } from "@tanstack/react-query";
import { KEY as INVITATIONS } from "@/src/apiCalls/queries/groups/useGetGroupInvitations";
import useDeleteInvitation from "@/src/apiCalls/mutations/groups/useDeleteInvitation";
import useGetGroupUsers from "@/src/apiCalls/queries/groups/useGetGroupUsers";
import useRemoveGroupUser from "@/src/apiCalls/mutations/groups/useRemoveGroupUser";

interface SingleGroupPageProps {
  groupId: string;
}

const SingleGroupPage = ({ groupId }: SingleGroupPageProps) => {
  // const [invitations, setInvitations] = useState<GroupInvite[]>(
  //   prefetchedInvitations ?? []
  // );
  const [addGroupMember, setAddGroupMember] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const { data: group } = useGetGroup(groupId);
  const { data: invitations } = useGetGroupInvitations(groupId);
  const { data: users } = useGetGroupUsers(groupId);

  const {
    mutate: sendInvite,
    error,
    isLoading: loadingInvite,
  } = useSendInvite();

  const queryClient = useQueryClient();
  const handleSendInvite = () => {
    sendInvite(
      { groupId, name, phone: "+1" + phone },
      {
        onSuccess: (response) => {
          queryClient.setQueryData(
            [INVITATIONS, groupId],
            (data: any[] | undefined) => {
              if (!!data) {
                data = [
                  ...data,
                  { id: response.id, name, phone: "+1" + phone },
                ];
              }
              return data;
            }
          );
          setName("");
          setPhone("");
          setAddGroupMember(false);
        },
      }
    );
  };

  if (!group) {
    return <div>Could not find group</div>;
  } else {
    return (
      <>
        <div>
          <BackButton href="/settings" />
          <h2>{group.name}</h2>
          <div>
            {users?.map((user) => (
              <UserInGroup user={user} groupId={group.id} key={user.id} />
            ))}
            {invitations?.map((invitation) => (
              <PendingUser
                invitation={invitation}
                groupId={group.id}
                key={invitation.id}
              />
            ))}
            {addGroupMember && (
              <div className="my-5">
                <div className="flex flex-wrap items-end gap-y-2 gap-x-5">
                  <TextInput label="Name" value={name} setValue={setName} />
                  <TextInput label="Phone" value={phone} setValue={setPhone} />
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleSendInvite}
                      disabled={loadingInvite}
                      isLoading={loadingInvite}
                    >
                      Send Invite
                    </Button>
                    <button
                      className="text-sm"
                      onClick={() => setAddGroupMember(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
                {!!error && (
                  <div className="text-xs text-red-500 py-2">
                    {error?.toString()}
                  </div>
                )}
              </div>
            )}
            {!addGroupMember && (
              <div
                className="flex gap-2 items-center my-5 font-bold cursor-pointer"
                onClick={() => setAddGroupMember(true)}
              >
                <PlusIcon className="h-5 w-5" /> Add Group Member
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
};

export default SingleGroupPage;

interface UserInGroupProps {
  user: GroupUser;
  groupId: number;
}

const UserInGroup = ({ user, groupId }: UserInGroupProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { mutate: removeUser } = useRemoveGroupUser(groupId, user.id);
  const handleRemoveUser = () => {
    removeUser(undefined, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };
  return (
    <>
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div>{user.name}</div>
        <MinusCircleIcon className="h-4 w-4 text-yellow-500" />
      </div>
      <Modal open={open} setOpen={setOpen}>
        <h4>Are you sure you want to remove this user?</h4>
        <div className="flex gap-5 pt-5">
          <Button className=" flex-1" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="flex-1 bg-yellow-500 hover:bg-yellow-500/90">
            Remove
          </Button>
        </div>
      </Modal>
    </>
  );
};

interface PendingUserProps {
  invitation: GroupInvite;
  groupId: number;
}

const PendingUser = ({ invitation, groupId }: PendingUserProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { mutate: deleteInvitation, isLoading } = useDeleteInvitation();
  const handleDeleteInvitation = () => {
    deleteInvitation(
      { groupId, invitationId: invitation.id },
      {
        onSuccess: () => {
          queryClient.setQueryData(
            [INVITATIONS, groupId.toString()],
            (data: any[] | undefined) => {
              const newData: any[] = JSON.parse(JSON.stringify(data));
              if (!!newData && newData.length > 0) {
                const index = newData?.findIndex((i) => invitation.id === i.id);
                if (index !== -1) {
                  newData.splice(index, 1);
                }
              }
              return newData;
            }
          );
          setOpen(false);
        },
      }
    );
  };
  return (
    <>
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div>{invitation.name}</div>
        <ClockIcon className="h-4 w-4 " />
      </div>
      <Modal open={open} setOpen={setOpen}>
        <h4>Are you sure you want to delete this invitation?</h4>
        <div className="flex gap-5 pt-5">
          <Button className=" flex-1" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteInvitation}
            className="flex-1 bg-yellow-500 hover:bg-yellow-500/90"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Remove
          </Button>
        </div>
      </Modal>
    </>
  );
};
