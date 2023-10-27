import { PrismaClient } from "@prisma/client";
import { NextPage } from "next";
import React from "react";
import OrderHistoryTable from "./components/order-history-table";

const OrderHistories: NextPage = async () => {
  const prisma = new PrismaClient();

  const getOrders = async () => {
    const res = await prisma.orders.findMany({
      include: {
        order_details: {
          include: {
            suppliers: true,
          },
        },
        shipping_addresses: true,
      },
    });
    const data = res.map((value) => {
      const newOrderDetails = value.order_details.map((orderDetail) => ({
        ...orderDetail,
        id:
          typeof orderDetail.id === "bigint"
            ? Number(orderDetail.id.toString())
            : orderDetail.id,
        suppliers: {
          ...orderDetail.suppliers,
          id:
            typeof orderDetail.suppliers.id === "bigint"
              ? Number(orderDetail.suppliers.id.toString())
              : orderDetail.suppliers.id,
        },
      }));

      const newShippingAddresses = {
        ...value.shipping_addresses,
        id:
          typeof value.shipping_addresses.id === "bigint"
            ? Number(value.shipping_addresses.id.toString())
            : value.shipping_addresses.id,
      };

      return {
        ...value,
        id:
          typeof value.id === "bigint" ? Number(value.id.toString()) : value.id,
        order_details: [...newOrderDetails],
        shipping_addresses: { ...newShippingAddresses },
      };
    });
    return data;
  };

  const orders = await getOrders();
  console.log(orders);

  return (
    <div className="w-full max-w-[calc(1300px)] mx-auto">
      <h1 className="mt-6 text-3xl font-bold">発注履歴</h1>
      <OrderHistoryTable orders={orders} />
    </div>
  );
};

export default OrderHistories;
