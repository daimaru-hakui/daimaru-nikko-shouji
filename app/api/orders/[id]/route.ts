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
  const prisma = new PrismaClient();

  return await prisma
    .$transaction(async (prisma) => {
      await prisma.orders.update({
        where: {
          id: body.id,
        },
        data: {
          orderNumber: body.orderNumber,
          topicName: body.topicName,
          shippingAddressId: Number(body.shippingAddressId),
        },
      });
      for await (let orderDetail of body.orderDetails) {
        await prisma.orderDetails.update({
          where: { id: orderDetail.id },
          data: {
            productNumber: orderDetail.productNumber,
            productName: orderDetail.productName,
            color: orderDetail.color,
            size: orderDetail.size,
            price: Number(orderDetail.price),
            orderQuantity: Number(orderDetail.orderQuantity),
            quantity: Number(orderDetail.quantity),
            processing: orderDetail.processing,
            comment: orderDetail.comment,
          },
        });
      }
      return NextResponse.json("更新しました", { status: 200 });
    })
    .catch((err) => {
      console.log(err);
      return NextResponse.json(err, { status: 409 });
    });
}

// export async function PATCH(req: NextRequest) {
//   const { body }: { body: Order } = await req.json();
//   const { id, order_status } = body;
//   const prisma = new PrismaClient();

//   return await prisma
//     .$transaction(async (prisma) => {
//       const resOrder = await prisma.orders.findUnique({
//         where: { id },
//       });

//       if (
//         resOrder?.order_status !== "CANCEL" &&
//         resOrder?.order_status !== "UNREAD" &&
//         order_status === "CANCEL"
//       ) {
//         return NextResponse.json("キャンセルできません。", { status: 409 });
//       }

//       if (resOrder?.order_status === "CANCEL") {
//         return NextResponse.json("キャンセル済みです。", { status: 409 });
//       }

//       const data = await prisma.orders.update({
//         where: {
//           id,
//         },
//         data: {
//           order_status,
//         },
//       });

//       return NextResponse.json(data, { status: 200 });
//     })
//     .catch((error) => {
//       console.error(error);
//       return NextResponse.json(error, { status: 409 });
//     });
// }
