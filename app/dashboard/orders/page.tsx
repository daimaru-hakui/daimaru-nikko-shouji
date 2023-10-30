import React from "react";
import OrderForm from "./components/order-form";
import { PrismaClient } from "@prisma/client";
import { bigintToIntHandler } from "@/utils/functions";

const OrderOage = async () => {

  return (
    <div className="w-full max-w-[calc(1500px)]">
      <h1 className="mt-6 text-3xl font-bold">Order</h1>
      <OrderForm />
    </div>
  );
};

export default OrderOage;
