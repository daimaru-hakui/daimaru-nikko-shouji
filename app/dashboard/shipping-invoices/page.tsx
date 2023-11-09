import React from "react";
import { NextPage } from "next";
import ShippingInvoicesTable from "./components/shipping-invoices-table";

const ShippingInvoices: NextPage = async () => {

  return (
    <div className="w-full max-w-[calc(900px)] mx-auto">
      <h1 className="mt-6 text-3xl font-bold">出荷伝票</h1>
      <ShippingInvoicesTable  />
    </div>
  );
};

export default ShippingInvoices;
