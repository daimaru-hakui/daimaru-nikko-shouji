import React from "react";
import { NextPage } from "next";
import ShippingHistoriesTable from "./components/shipping-histories-table";

const ShippingHistories: NextPage = async () => {
  return (
    <div className="w-full max-w-[calc(1200px)] mx-auto">
      <h1 className="mt-6 text-3xl font-bold">出荷履歴</h1>
      <ShippingHistoriesTable />
    </div>
  );
};

export default ShippingHistories;