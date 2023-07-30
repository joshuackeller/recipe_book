import Authorize from "@/src/utilities/Authorize";
import prisma from "@/src/utilities/client";
import { NextRequest, NextResponse } from "next/server";

interface ContextParams {
  params: {
    invitationId: string;
  };
}

export async function GET(
  _req: NextRequest,
  { params: { invitationId } }: ContextParams
) {
  const userId = await Authorize();

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  const invitation = await prisma.groupInvite.findUniqueOrThrow({
    where: {
      id: parseInt(invitationId),
      phone: user.phone,
    },
  });

  return NextResponse.json({ success: true, data: invitation });
}

export async function POST(
  _req: NextRequest,
  { params: { invitationId } }: ContextParams
) {
  const userId = await Authorize();

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  const invitation = await prisma.groupInvite.findUniqueOrThrow({
    where: {
      id: parseInt(invitationId),
      phone: user.phone,
    },
  });

  const [newUserGroup, _deletedInvitation] = await prisma.$transaction([
    prisma.userGroup.create({
      data: {
        user: { connect: { id: userId } },
        group: { connect: { id: invitation.groupId } },
      },
    }),
    prisma.groupInvite.delete({
      where: { id: parseInt(invitationId), phone: user.phone },
    }),
  ]);

  return NextResponse.json({ success: true, data: newUserGroup });
}

export async function DELETE(
  _req: NextRequest,
  { params: { invitationId } }: ContextParams
) {
  const userId = await Authorize();

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  await prisma.groupInvite.delete({
    where: { id: parseInt(invitationId), phone: user.phone },
  });

  return NextResponse.json({ success: true, data: null });
}
