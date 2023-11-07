import { ShippingInputs } from "@/types/index";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const order: ShippingInputs = await req.json();
  const prisma = new PrismaClient();

  try {
    await prisma.$transaction(async () => {
      const shippingHistory = await prisma.shipping_histories.create({
        data: {
          shipping_date: order.shippingDate,
          shipping_address_id: Number(order.shippingAddressId),
        }
      });
      const shippingDetails = order.contents.map((content) => {
        return {
          shipping_history_id: shippingHistory.id,
          order_detail_id: content.orderDetailId,
          quantity: content.quantity
        };
      });
      await prisma.shipping_details.createMany({
        data: [...shippingDetails]

      });

      let orderDetails: any = [];
      order.contents.forEach(async (content) => {
        const orderDetail = await prisma.order_details.findUnique({
          where: {
            id: content.orderDetailId
          }
        });
        if (!orderDetail) throw new Error("データがありません。");
        const quantity = (orderDetail?.quantity - Number(content.quantity)) >= 0 ?
          (orderDetail?.quantity - Number(content.quantity)) : false;
        if (!quantity) throw new Error("在庫数が足りません。");
        orderDetails.push({
          where: {
            id: content.orderDetailId
          },
          data: {
            quantity
          }
        });
      });
      await prisma.order_details.update(orderDetails);
    });
    return NextResponse.json({ msg: "成功しました" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  } finally {
    prisma.$disconnect();
  }

}