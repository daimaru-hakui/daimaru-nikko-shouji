import { bigintToIntHandler } from "@/utils/functions";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number; }; }
) {
  const id = Number(params.id);
  const prisma = new PrismaClient();

  const getOrder = async () => {
    const data = await prisma.orders.findUnique({
      where: { id },
      include: {
        order_details: {
          orderBy: [
            {
              id: 'asc',
            },
          ],
          include: {
            suppliers: true,
          },
        },
        shipping_addresses: true,
      },
       
    });
    return data
  };

  try {
    const data = await getOrder();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}

export async function PATCH(req: NextRequest) {
  const { body } = await req.json();
  const { id, order_status } = body;
  const prisma = new PrismaClient();

  try {
    const data = await prisma.orders.update({
      where: {
        id
      },
      data: {
        order_status
      }
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 409 });
  }
}
