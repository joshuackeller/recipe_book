import Authorize from "@/src/utilities/Authorize";
import prisma from "@/src/utilities/client";
import { NextResponse } from "next/server";

interface ContextProps {
  params: {
    tagId: string;
    recipeId: string;
  };
}

export async function POST(
  _req: Request,
  { params: { tagId, recipeId } }: ContextProps
) {
  const userId = await Authorize();
  await prisma.tag.update({
    where: {
      id_userId: {
        id: parseInt(tagId),
        userId,
      },
    },
    data: {
      recipes: {
        connect: {
          id_userId: {
            id: parseInt(recipeId),
            userId,
          },
        },
      },
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _req: Request,
  { params: { tagId, recipeId } }: ContextProps
) {
  const userId = await Authorize();
  await prisma.tag.update({
    where: {
      id_userId: {
        id: parseInt(tagId),
        userId,
      },
    },
    data: {
      recipes: {
        disconnect: {
          id_userId: {
            id: parseInt(recipeId),
            userId,
          },
        },
      },
    },
  });

  return NextResponse.json({ success: true });
}
