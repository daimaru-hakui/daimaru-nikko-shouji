import { bigintToIntHandler } from "@/utils/functions";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const data = await prisma.order_details.findMany({
      orderBy: [{
        created_at: "desc",
      }],
      include: {
        orders: {
          include: {
            shipping_addresses: true,
          }
        },
        suppliers: true
      }
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  } finally {
    prisma.$disconnect();
  }
}