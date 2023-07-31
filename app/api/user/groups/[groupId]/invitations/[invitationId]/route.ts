import Authorize from "@/src/utilities/Authorize";
import prisma from "@/src/utilities/client";
import { NextRequest, NextResponse } from "next/server";

interface ContextParams {
  params: {
    groupId: string;
    invitationId: string;
  };
}

export async function GET(
  _req: NextRequest,
  { params: { groupId, invitationId } }: ContextParams
) {
  const userId = await Authorize();
  if(!userId)  return NextResponse.json({success: false, message: "Invalid token"}, {status: 403})
  

  const invitation = await prisma.groupInvite.findUniqueOrThrow({
    where: {
      id: parseInt(invitationId),
      group: {
        id: parseInt(groupId),
        users: {
          some: {
            userId,
          },
        },
      },
    },
  });

  return NextResponse.json({ success: true, data: invitation });
}

export async function DELETE(
  _req: NextRequest,
  { params: { groupId, invitationId } }: ContextParams
) {
  const userId = await Authorize();
  if(!userId)  return NextResponse.json({success: false, message: "Invalid token"}, {status: 403})
  

  prisma.groupInvite.delete({
    where: {
      id: parseInt(invitationId),
      group: {
        id: parseInt(groupId),
        users: {
          some: {
            userId,
          },
        },
      },
    },
  });

  return NextResponse.json({ success: true, data: null });
}
