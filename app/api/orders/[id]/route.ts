import { bigintToIntHandler } from "@/utils/functions";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const prisma = new PrismaClient();

  const getOrder = async () => {
    const res = await prisma.orders.findUnique({
      where: { id: params.id },
      include: {
        order_details: {
          include: {
            suppliers: true,
          },
        },
        shipping_addresses: true,
      },
    });

    const newOrderDetails = res?.order_details.map((orderDetail) => ({
      id: bigintToIntHandler(Number(orderDetail.id)),
      order_history_id: bigintToIntHandler(
        Number(orderDetail.order_history_id)
      ),
      supplier_id: bigintToIntHandler(Number(orderDetail.supplier_id)),
      suppliers: {
        ...orderDetail.suppliers,
        id: bigintToIntHandler(Number(orderDetail.supplier_id)),
      },
    }));

    const newShippingAddresses = {
      ...res?.shipping_addresses,
      id: bigintToIntHandler(Number(res?.shipping_address_id)),
    };

    return {
      ...res,
      id: bigintToIntHandler(Number(res?.id)),
      shipping_address_id: bigintToIntHandler(Number(res?.shipping_address_id)),
      order_details: newOrderDetails,
      shipping_addresses: newShippingAddresses,
    };
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
