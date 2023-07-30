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

  const group = await prisma.group.findUniqueOrThrow({
    where: {
      id: parseInt(groupId),
      users: {
        some: {
          userId,
        },
      },
    },
  });

  return NextResponse.json({ success: true, data: group });
}

export async function PUT(
  req: NextRequest,
  { params: { groupId } }: ContextParams
) {
  const userId = await Authorize();

  const name = await req.json();

  if (!name || name.length < 1) {
    return NextResponse.json(
      { success: false, data: null, message: "Name is required" },
      { status: 400 }
    );
  }

  const group = await prisma.group.update({
    where: {
      id: parseInt(groupId),
      users: {
        some: {
          userId,
        },
      },
    },
    data: {
      name,
    },
  });

  return NextResponse.json({ success: true, data: group });
}

export async function DELETE(
  _req: NextRequest,
  { params: { groupId } }: ContextParams
) {
  const userId = await Authorize();

  await prisma.group.delete({
    where: {
      id: parseInt(groupId),
      users: {
        some: {
          userId,
        },
      },
    },
  });

  return NextResponse.json({ success: true, data: null });
}
