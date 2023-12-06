import { OrderContent } from "@/types/index";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { body }: { body: OrderContent[] } = await req.json();
  const prisma = new PrismaClient();

  return await prisma
    .$transaction(async (prisma) => {
      for (let orderDetail of body) {
        await prisma.order_details.update({
          where: { id: orderDetail.id },
          data: {
            product_number: orderDetail.productNumber,
            product_name: orderDetail.productName,
            color: orderDetail.color,
            size: orderDetail.size,
            price: Number(orderDetail.price),
            order_quantity: Number(orderDetail.orderQuantity),
            quantity: Number(orderDetail.quantity),
            processing: orderDetail.processing,
            comment: orderDetail.comment,
          },
        });
      }
      return NextResponse.json("更新しました", { status: 200 });
    })
    .catch((err) => {
      return NextResponse.json(err, { status: 409 });
    });
}
