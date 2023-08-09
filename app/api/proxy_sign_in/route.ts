import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SIGN_IN_URL = process.env.NEXT_PUBLIC_API_URL + "/auth/sign_in";

export async function POST(req: Request) {
  const { code, phone } = await req.json();
  const response = await fetch(SIGN_IN_URL, {
    body: JSON.stringify({
      code,
      phone,
    }),
    method: "POST",
  });

  const responseBody = await response.json();

  if (!!responseBody?.token) {
    cookies().set("token", responseBody.token);
    return NextResponse.json({ token: responseBody.token });
  } else {
    return NextResponse.json({ message: "Could not sign in" }, { status: 403 });
  }
}
