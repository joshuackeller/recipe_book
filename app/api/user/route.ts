import { NextResponse } from "next/server";
import Authorize from "@/src/utilities/Authorize";
import prisma from "@/src/utilities/client";

export async function GET(_req: Request) {
  const userId = await Authorize();
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  return NextResponse.json({ success: true, data: user });
}
