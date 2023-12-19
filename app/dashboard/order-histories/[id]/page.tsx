import React from "react";
import OrderEditArea from "./components/order-edit-area";
import { PrismaClient } from "@prisma/client";

const OrderEditPage = async () => {
  const prisma = new PrismaClient();

  const getOrderById = async () => {
    const data = await prisma.orders.findUnique({
      where: {
        id: 10,
      },
      include: {
        orderDetails: true,
      },
    });
    return data;
  };

  console.log(await getOrderById());
  return (
    <div className="w-full max-w-[calc(1100px)] mx-auto">
      <h1 className="mt-6 text-3xl font-bold">編集</h1>
      <OrderEditArea />
    </div>
  );
};

export default OrderEditPage;
