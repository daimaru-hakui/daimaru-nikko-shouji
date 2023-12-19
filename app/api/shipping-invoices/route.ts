import { ShippingInputs } from "@/types/index";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();
  try {
    const data = await prisma.shippingHistories.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      include: {
        shippingAddresses: true,
        shippingDetails: true,
        orders: true,
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  const { body }: { body: ShippingInputs } = await req.json();
  const prisma = new PrismaClient();
  try {
    await prisma.$transaction(async (prisma) => {
      const shippingHistory = await prisma.shippingHistories.create({
        data: {
          shippingDate: new Date(body.shippingDate).toISOString(),
          shippingAddressId: Number(body.shippingAddressId),
          orderId: Number(body.orderId),
        },
      });
      const shippingDetails = body.contents.map((content: any) => {
        return {
          shippingHistoryId: shippingHistory.id,
          orderDetailId: content.orderDetailId,
          quantity: Number(content.quantity),
        };
      });
      await prisma.shippingDetails.createMany({
        data: [...shippingDetails],
      });

      for (const content of body.contents) {
        const orderDetail = await prisma.orderDetails.findUnique({
          where: {
            id: content.orderDetailId,
          },
        });
        if (!orderDetail) throw new Error("データがありません。");
        const result =
          orderDetail?.quantity - Number(content.quantity) >= 0 ? true : false;
        if (!result) throw new Error("在庫数が足りません。");
        const quantity = orderDetail?.quantity - Number(content.quantity);
        await prisma.orderDetails.update({
          where: {
            id: orderDetail.id,
          },
          data: {
            quantity,
          },
        });
      }
    });
    return NextResponse.json({ msg: "成功しました" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}
