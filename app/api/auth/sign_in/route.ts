import prisma from "@/src/utilities/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
// import twilio from "twilio";
// import { DateTime } from "luxon";

// const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(req: Request) {
  const { code, phone } = await req.json();

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      phone,
    },
    include: {
      accessCode: true,
    },
  });

  // Missing code
  if (!user.accessCode) {
    return NextResponse.json(
      {
        success: false,
        message: "No code found. Please request a new code.",
      },
      { status: 403 }
    );
  }
  // Too many attempts
  else if (user.accessCode.attempts > 5) {
    await prisma.accessCode.delete({
      where: {
        userId: user.id,
      },
    });
    return NextResponse.json(
      {
        success: false,
        message: "Number of attempts exceeded. Please request new code.",
      },
      { status: 403 }
    );
  }
  // Incorrect code
  else if (user.accessCode.code !== parseInt(code)) {
    await prisma.accessCode.update({
      where: {
        userId: user.id,
      },
      data: {
        attempts: {
          increment: 1,
        },
      },
    });
    return NextResponse.json(
      {
        success: false,
        message: "Incorrect code",
      },
      { status: 403 }
    );
  }
  // Expired code (5 minutes)
  else if (Date.now() - user.accessCode.createdAt.getTime() > 5 * 60 * 1000) {
    await prisma.accessCode.delete({
      where: {
        userId: user.id,
      },
    });
    return NextResponse.json(
      {
        success: false,
        message: "Code has expired. Please request a new code.",
      },
      { status: 403 }
    );
  }

  if (user && user.accessCode.code === parseInt(code)) {
    if (process.env.JWT_SECRET) {
      await prisma.accessCode.delete({
        where: {
          userId: user.id,
        },
      });
      // SUCCESS
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      cookies().set("token", token);
      return NextResponse.json({
        success: true,
        data: {
          token,
        },
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Could not create token",
        },
        { status: 403 }
      );
    }
  } else {
    return NextResponse.json(
      {
        success: false,
        message: "Incorrect phone or code",
      },
      { status: 403 }
    );
  }
}
