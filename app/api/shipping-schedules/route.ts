import { bigintToIntHandler } from "@/utils/functions";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const data = await prisma.orderDetails.findMany({
      where: {
        quantity: {
          gt: 0,
        },
        orders: {
          orderStatus: {
            "notIn": ["CANCEL"],
          },
        },
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      include: {
        orders: {
          include: {
            shippingAddresses: true,
          },
        },
        suppliers: true,
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  } finally {
    await prisma.$disconnect();
  }
}
