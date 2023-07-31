import Authorize from "@/src/utilities/Authorize";
import prisma from "@/src/utilities/client";
import { NextResponse } from "next/server";

interface ContextProps {
  params: {
    tagId: string;
  };
}

export async function GET(_req: Request, { params: { tagId } }: ContextProps) {
  const userId = await Authorize();
  if(!userId)  return NextResponse.json({success: false, message: "Invalid token"}, {status: 403})
  
  const tag = await prisma.tag.findUniqueOrThrow({
    where: {
      id_userId: {
        id: parseInt(tagId),
        userId,
      },
    },
  });

  return NextResponse.json({ success: true, data: tag });
}

export async function PUT(req: Request, { params: { tagId } }: ContextProps) {
  const userId = await Authorize();
  if(!userId)  return NextResponse.json({success: false, message: "Invalid token"}, {status: 403})
  

  const { name } = await req.json();

  if (!name)
    return NextResponse.json(
      { sucess: false, message: "Name is required" },
      { status: 400 }
    );

  const tag = await prisma.tag.update({
    where: {
      id_userId: {
        id: parseInt(tagId),
        userId,
      },
    },
    data: {
      name,
    },
  });

  return NextResponse.json({ success: true, data: tag });
}

export async function DELETE(
  req: Request,
  { params: { tagId } }: ContextProps
) {
  const userId = await Authorize();
  if(!userId)  return NextResponse.json({success: false, message: "Invalid token"}, {status: 403})
  

  const tag = await prisma.tag.delete({
    where: {
      id_userId: {
        id: parseInt(tagId),
        userId,
      },
    },
  });

  return NextResponse.json({ success: true, data: tag });
}
