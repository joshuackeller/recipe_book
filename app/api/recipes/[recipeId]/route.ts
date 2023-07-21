import Authorize from "@/src/utilities/Authorize";
import prisma from "@/src/utilities/client";
import { revalidatePath } from "next/cache";
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

export async function PUT(
  req: Request,
  { params: { recipeId } }: ContextProps
) {
  const userId = await Authorize();

  const { name, html } = await req.json();

  const recipe = await prisma.recipe.update({
    where: {
      id_userId: {
        userId,
        id: parseInt(recipeId),
      },
    },
    data: {
      name,
      html,
    },
  });

  revalidatePath("/");

  return NextResponse.json({ success: true, data: recipe });
}

export async function DELETE(
  _req: Request,
  { params: { recipeId } }: ContextProps
) {
  const userId = await Authorize();
  await prisma.recipe.delete({
    where: {
      id_userId: {
        userId,
        id: parseInt(recipeId),
      },
    },
  });

  revalidatePath("/");

  return NextResponse.json({ success: true, data: null });
}