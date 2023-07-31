import Authorize from "@/src/utilities/Authorize";
import prisma from "@/src/utilities/client";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = await Authorize();
  if(!userId)  return NextResponse.json({success: false, message: "Invalid token"}, {status: 403})
  

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  const invitations = await prisma.groupInvite.findMany({
    where: {
      phone: user.phone,
    },
  });

  return NextResponse.json({ success: true, data: invitations });
}
