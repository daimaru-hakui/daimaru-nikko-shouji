import { bigintToIntHandler } from "@/utils/functions";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: number; }; }
) {
  const id = Number(params.id);
  const prisma = new PrismaClient();

  return await prisma.$transaction(async (prisma) => {
    const resOrder = await prisma.orders.findUnique({
      where: { id },
    });

    if (resOrder?.order_status !== "UNREAD") {
      throw new Error("キャンセルできません");
    }
    await prisma.orders.update({
      where: {
        id: id
      },
      data: {
        order_status: "CANCEL"
      },
    });
  }).then(() => {
    return NextResponse.json({ msg: "更新しました" }, { status: 200 });
  }).catch((error) => {
    return NextResponse.json({ msg: error }, { status: 409 });
  });

}