import React from "react";
import OrderForm from "./components/order-form";
import { PrismaClient } from "@prisma/client";

const OrderOage = async () => {
  const prisma = new PrismaClient()
  const getProducts = async () => {

    return [];
  };

  const getSuppliers = async () => {
    const response = await prisma.suppliers.findMany();
    const data = response.map((value) => {
      const int =
        typeof value.id === "bigint" ? Number(value.id.toString()) : value.id;
      return {
        ...value,
        id: int,
      };
    });
    await prisma.$disconnect();
    return data;
  };

  const products = await getProducts();
  const suppliers = await getSuppliers();
  if (!products) return;
  if (!suppliers) return;

  return (
    <div className="w-full max-w-[calc(1500px)]">
      <h1 className="mt-6 text-3xl font-bold">Order</h1>
      <OrderForm products={products} suppliers={suppliers} />
    </div>
  );
};

export default OrderOage;
