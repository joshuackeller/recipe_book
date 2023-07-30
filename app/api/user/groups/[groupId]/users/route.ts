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
  const authUserId = await Authorize();

  const users = await prisma.user.findMany({
    where: {
      groups: {
        some: {
          groupId: parseInt(groupId),
          userId: authUserId,
        },
      },
    },
  });

  return NextResponse.json({ success: true, data: users });
}
