import { Order } from "@/types/index";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = Number(params.id);
  const prisma = new PrismaClient();

  const getOrder = async () => {
    const data = await prisma.orders.findUnique({
      where: { id },
      include: {
        orderDetails: {
          orderBy: [
            {
              id: "asc",
            },
          ],
          include: {
            suppliers: true,
          },
        },
        shippingAddresses: true,
      },
    });
    return data;
  };

  const data = await prisma.orders.findMany()

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
  const { body }: { body: Order } = await req.json();
  const { id, orderStatus } = body;
  const prisma = new PrismaClient();

  return await prisma
    .$transaction(async (prisma) => {
      const resOrder = await prisma.orders.findUnique({
        where: { id },
      });

      if (
        resOrder?.orderStatus !== "CANCEL" &&
        resOrder?.orderStatus !== "UNREAD" &&
        orderStatus === "CANCEL"
      ) {
        return NextResponse.json("キャンセルできません。", { status: 409 });
      }

      if (resOrder?.orderStatus === "CANCEL") {
        return NextResponse.json("キャンセル済みです。", { status: 409 });
      }

      const data = await prisma.orders.update({
        where: {
          id,
        },
        data: {
          orderStatus,
        },
      });

      return NextResponse.json(data, { status: 200 });
    })
    .catch((error) => {
      console.error(error);
      return NextResponse.json(error, { status: 409 });
    });
}
