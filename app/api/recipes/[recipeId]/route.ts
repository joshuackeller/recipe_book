import Authorize from "@/src/utilities/Authorize";
import prisma from "@/src/utilities/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface ContextProps {
  params: {
    recipeId: string;
  };
}

export async function GET(
  _req: Request,
  { params: { recipeId } }: ContextProps
) {
  let userId;
  try {
    const headersList = headers();
    const token = headersList.get("authorization");

    let verified = false;
    if (!!token && !!process.env.JWT_SECRET) {
      try {
        if (jwt.verify(token, process.env.JWT_SECRET)) {
          verified = true;
        } else {
          throw new Error("error 1");
        }
      } catch {
        throw new Error("error 4");
      }
    } else {
      throw new Error("error 2");
    }

    if (verified) {
      const { userId } = jwt.decode(token) as any;
      return userId;
    } else {
      throw new Error("error 3");
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid token", error, userId },
      { status: 403 }
    );
  }

  const recipe = await prisma.recipe.findUniqueOrThrow({
    where: {
      id_userId: {
        userId,
        id: parseInt(recipeId),
      },
    },
    include: {
      tags: {
        select: {
          id: true,
          name: true,
        },
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
  if (!userId)
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 403 }
    );

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
  revalidatePath(`/recipes/${recipe.id}`);

  return NextResponse.json({ success: true, data: recipe });
}

export async function DELETE(
  _req: Request,
  { params: { recipeId } }: ContextProps
) {
  const userId = await Authorize();
  if (!userId)
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 403 }
    );

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
