import { ShippingInputs } from "@/types/index";
import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { body } = await req.json();
  const prisma = new PrismaClient();
  try {
    await prisma.$transaction(async (prisma) => {
      const shippingHistory = await prisma.shipping_histories.create({
        data: {
          shipping_date: new Date(body.shippingDate).toISOString(),
          shipping_address_id: Number(body.shippingAddressId),
        }
      });
      const shippingDetails = body.contents.map((content: any) => {
        return {
          shipping_history_id: shippingHistory.id,
          order_detail_id: content.orderDetailId,
          quantity: Number(content.quantity)
        };
      });
      await prisma.shipping_details.createMany({
        data: [...shippingDetails]

      });

      let orderDetails: any = [];
      body.contents.forEach(async (content: any) => {
        const orderDetail = await prisma.order_details.findUnique({
          where: {
            id: content.orderDetailId
          }
        });
        if (!orderDetail) throw new Error("データがありません。");
        console.log("quantity");
        const result = (orderDetail?.quantity - Number(content.quantity)) >= 0 ?
          true : false;
        if (!result) throw new Error("在庫数が足りません。");
        const quantity = (orderDetail?.quantity - Number(content.quantity));
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