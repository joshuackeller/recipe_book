import Authorize from "@/src/utilities/Authorize";
import prisma from "@/src/utilities/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search");
  const userId = await Authorize();
  if(!userId)  return NextResponse.json({success: false, message: "Invalid token"}, {status: 403})
  
  const tags = await prisma.tag.findMany({
    where: {
      userId,
      name: !!search ? { contains: search } : undefined,
    },
    take: 5,
  });

  return NextResponse.json({ success: true, data: tags });
}

export async function POST(req: Request) {
  const userId = await Authorize();
  if(!userId)  return NextResponse.json({success: false, message: "Invalid token"}, {status: 403})
  

  const { name, recipeId } = await req.json();

  if (!name)
    return NextResponse.json(
      { sucess: false, message: "Name is required" },
      { status: 400 }
    );

  const tags = await prisma.tag.create({
    data: {
      name,
      userId,
      recipes: recipeId
        ? {
            connect: {
              id_userId: {
                id: recipeId,
                userId,
              },
            },
          }
        : undefined,
    },
  });

  return NextResponse.json({ success: true, data: tags });
}
