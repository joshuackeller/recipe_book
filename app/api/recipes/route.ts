import Authorize from "@/src/utilities/Authorize";
import prisma from "@/src/utilities/client";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = await Authorize();

  const search = req.nextUrl.searchParams.get("search");
  const stringTagIds = req.nextUrl.searchParams.get("tagIds");
  const stringArrayTagIds = stringTagIds?.split(",");
  const tagIds = stringArrayTagIds?.map((tagId) => parseInt(tagId));

  // FIX mode: "insensitive"
  const where: Prisma.RecipeWhereInput = {
    userId,
    tags: !!tagIds ? { some: { id: { in: tagIds } } } : undefined,
    name: search ? { contains: search } : undefined,
  };

  const recipes = await prisma.recipe.findMany({
    where,
    take: 25,
  });

  return NextResponse.json({ success: true, data: recipes });
}

export async function POST(req: Request) {
  const userId = await Authorize();

  const { name, html, tags } = await req.json();

  if (!name)
    return NextResponse.json(
      { sucess: false, message: "Name is required" },
      { status: 400 }
    );
  if (!html)
    return NextResponse.json(
      { sucess: false, message: "HTML is required" },
      { status: 400 }
    );

  const recipe = await prisma.recipe.create({
    data: {
      user: { connect: { id: userId } },
      name,
      html,
      tags:
        tags && tags.length > 0
          ? {
              connectOrCreate: tags.map((tag: any) => ({
                where: {
                  id_userId: {
                    id: tag.id,
                    userId,
                  },
                },
                create: {
                  name: tag.name,
                  user: { connect: { id: userId } },
                },
              })),
            }
          : undefined,
    },
  });

  revalidatePath("/");

  return NextResponse.json({ success: true, data: recipe });
}
