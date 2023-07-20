import Authorize from "@/src/utilities/Authorize";
import prisma from "@/src/utilities/client";
import { NextResponse } from "next/server";

interface ContextProps {
  params: {
    recipeId: string;
  };
}

export async function GET(
  _req: Request,
  { params: { recipeId } }: ContextProps
) {
  const userId = await Authorize();
  const recipe = await prisma.recipe.findUniqueOrThrow({
    where: {
      id_userId: {
        userId,
        id: parseInt(recipeId),
      },
    },
  });

  return NextResponse.json({ success: true, data: recipe });
}
