import Authorize from "@/src/utilities/Authorize";
import prisma from "@/src/utilities/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = await Authorize();
  const recipes = await prisma.recipe.findMany({
    where: {
      userId,
    },
  });

  return NextResponse.json({ success: true, data: recipes });
}

export async function POST(req: Request) {
  const userId = await Authorize();

  const { name, html } = await req.json();

  const recipe = await prisma.recipe.create({
    data: {
      user: { connect: { id: userId } },
      name,
      html,
    },
  });

  revalidatePath("/");

  return NextResponse.json({ success: true, data: recipe });
}
