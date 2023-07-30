import Authorize from "@/src/utilities/Authorize";
import prisma from "@/src/utilities/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const userId = await Authorize();

  const groups = await prisma.group.findMany({
    where: {
      users: {
        some: {
          userId,
        },
      },
    },
  });

  return NextResponse.json({ success: true, data: groups });
}

export async function POST(req: NextRequest) {
  const userId = await Authorize();
  const { name } = await req.json();

  if (!name || name.length < 1) {
    return NextResponse.json(
      { success: false, data: null, message: "Name is required" },
      { status: 400 }
    );
  }

  const team = await prisma.group.create({
    data: {
      name,
      users: {
        create: {
          userId,
        },
      },
    },
  });

  return NextResponse.json({ success: true, data: team });
}
