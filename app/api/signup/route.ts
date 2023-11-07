import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { body } = await req.json();
  const prisma = new PrismaClient();

  try {
    await prisma.users.create({
      data: {
        id: body.id,
        email: body.email,
      },
    });
    return NextResponse.json({ msg: "登録に成功しました" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 409 });
  }
}
