import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();
  try {
    const data = await prisma.shippingDetails.findMany({
      include: {
        shippingHistories: {
          include: {
            shippingAddresses: true,
            orders:true
          },
        },
        orderDetails: true,
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  } finally {
    await prisma.$disconnect()
  }
}
