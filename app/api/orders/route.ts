import { Carts, CreateOrder } from "@/types/index";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();

  const getOrders = async () => {
    const data = await prisma.orders.findMany({
      include: {
        orderDetails: {
          include: {
            suppliers: true,
          },
        },
        shippingAddresses: true,
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

let createOrder: CreateOrder;
export async function POST(req: NextRequest) {
  const carts: Carts = await req.json();
  const prisma = new PrismaClient();
  try {
    await prisma.$transaction(async (prisma) => {
      createOrder = await prisma.orders.create({
        data: {
          shippingAddressId: carts.shippingAddress,
          orderNumber: carts.orderNumber,
          topicName: carts.topicName,
        },
      });

      const array = carts.contents.map((content) => ({
        orderId: createOrder.id,
        supplierId: Number(content.supplierId),
        productNumber: content.productNumber.trim(),
        productName: content.productName.trim(),
        color: content.color.trim(),
        size: content.size.trim() || "",
        quantity: Number(content.quantity),
        orderQuantity: Number(content.quantity),
        comment: content.comment.trim() || "",
        processing: content.processing,
      }));

      await prisma.orderDetails.createMany({
        data: [...array],
      });
    });
    return NextResponse.json(createOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  } finally {
    prisma.$disconnect();
  }
}
