import Authorize from "@/src/utilities/Authorize";
import prisma from "@/src/utilities/client";
import { NextRequest, NextResponse } from "next/server";

interface ContextParams {
  params: {
    groupId: string;
    userId: string;
  };
}

export async function GET(
  _req: NextRequest,
  { params: { groupId, userId } }: ContextParams
) {
  const authUserId = await Authorize();

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: parseInt(userId),
      groups: {
        some: {
          groupId: parseInt(groupId),
          userId: authUserId,
        },
      },
    },
  });

  return NextResponse.json({ success: true, data: user });
}

export async function DELETE(
  _req: NextRequest,
  { params: { groupId, userId } }: ContextParams
) {
  const authUserId = await Authorize();

  // ensure user is in group
  await prisma.userGroup.findUniqueOrThrow({
    where: {
      userId_groupId: {
        userId: authUserId,
        groupId: parseInt(groupId),
      },
    },
  });

  await prisma.userGroup.delete({
    where: {
      userId_groupId: {
        userId: parseInt(userId),
        groupId: parseInt(groupId),
      },
    },
  });

  return NextResponse.json({ success: true, data: null });
}
