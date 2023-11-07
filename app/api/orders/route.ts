import { Carts } from "@/types/index";
import { bigintToIntHandler } from "@/utils/functions";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();

  const getOrders = async () => {
    const data = await prisma.orders.findMany({
      include: {
        order_details: {
          include: {
            suppliers: true,
          },
        },
        shipping_addresses: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    return data;
  };

  try {
    const orders = await getOrders();
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  const carts: Carts = await req.json();
  const prisma = new PrismaClient();

  try {
    const newOrder = await prisma.$transaction(async (prisma) => {
      const createOrder = await prisma.orders.create({
        data: {
          shipping_address_id: carts.shippingAddress,
          order_number: carts.orderNumber,
          topic_name: carts.topicName,
        },
      });

      const array = carts.contents.map((content) => ({
        order_id: createOrder.id,
        supplier_id: Number(content.supplierId),
        product_number: content.productNumber.trim(),
        product_name: content.productName.trim(),
        color: content.color.trim(),
        size: content.size.trim() || "",
        quantity: Number(content.quantity),
        order_quantity: Number(content.quantity),
        comment: content.comment.trim() || "",
        processing: content.processing,
      }));

      await prisma.order_details.createMany({
        data: [...array],
      });
    });
    return NextResponse.json(newOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  } finally {
    prisma.$disconnect();
  }
}
