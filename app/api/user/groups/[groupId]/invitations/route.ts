import Authorize from "@/src/utilities/Authorize";
import prisma from "@/src/utilities/client";
import { NextRequest, NextResponse } from "next/server";

interface ContextParams {
  params: {
    groupId: string;
  };
}

export async function GET(
  _req: NextRequest,
  { params: { groupId } }: ContextParams
) {
  const userId = await Authorize();
  if(!userId)  return NextResponse.json({success: false, message: "Invalid token"}, {status: 403})
  

  const invitations = await prisma.groupInvite.findMany({
    where: {
      groupId: parseInt(groupId),
      group: {
        users: {
          some: {
            userId,
          },
        },
      },
    },
  });

  return NextResponse.json({ success: true, data: invitations });
}

export async function POST(
  req: NextRequest,
  { params: { groupId } }: ContextParams
) {
  const userId = await Authorize();
  if(!userId)  return NextResponse.json({success: false, message: "Invalid token"}, {status: 403})
  

  const { phone } = await req.json();

  const phoneRegex = /^\+1\d{10}$/;
  const isValidPhone = phoneRegex.test(phone);

  // validate user is in group
  await prisma.group.findUniqueOrThrow({
    where: {
      id: parseInt(groupId),
      users: {
        some: {
          userId,
        },
      },
    },
  });

  if (isValidPhone) {
    const invitation = await prisma.groupInvite.create({
      data: {
        phone,
        groupId: parseInt(groupId),
      },
    });

    // send text message here with invitation details

    return NextResponse.json({ success: true, data: invitation });
  } else {
    return NextResponse.json({ success: false, message: "Invalid phone" });
  }
}
