import { PrismaClient } from "@prisma/client";
import { NextPage } from "next";
import React from "react";
import OrderHistoryTable from "./components/order-history-table";

const OrderHistories: NextPage = async () => {

  return (
    <div className="w-full max-w-[calc(1300px)] mx-auto">
      <h1 className="mt-6 text-3xl font-bold">発注履歴</h1>
      <OrderHistoryTable />
    </div>
  );
};

export default OrderHistories;
