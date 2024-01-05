import React from "react";
import OrderEditArea from "./components/order-edit-area";
import { PrismaClient } from "@prisma/client";


const OrderEditPage = async ({ params }: { params: { id: number } }) => {
  const id = params.id;
  const prisma = new PrismaClient();

  const getOrderById = async () => {
    const data = await prisma.orders.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        shippingAddresses: true,
        orderDetails: {
          include: {
            suppliers: true,
          },
        },
      },
    });
    return data;
  };
  const data = await getOrderById();
  if (!data) return;

  return (
    <div className="w-full max-w-[calc(1400px)] mx-auto">
      <OrderEditArea data={data} />
    </div>
  );
};

export default OrderEditPage;
