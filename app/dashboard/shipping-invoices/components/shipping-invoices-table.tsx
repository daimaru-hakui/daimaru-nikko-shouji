"use client"
import { useGetShippingInvoiceyAll } from "@/hooks/useGetShippingInvoiceAll";
import React, { FC } from "react";
import ShippingInvoicesTableRow from "./shipping-invoices-table-row";

const ShippingInvoicesTable: FC = () => {
  const { shippingInvoices } = useGetShippingInvoiceyAll();
  const StyleTableTh = "py-0.5 px-1 text-left border-b";
  return (
    <div className="mt-12 w-full overflow-auto">
      <table className="w-full max-w-[calc(900px)] min-w-[calc(900px)]">
        <thead>
          <tr>
            <th className={`${StyleTableTh}`}>詳細</th>
            <th className={`${StyleTableTh}`}>出荷番号</th>
            <th className={`${StyleTableTh}`}>受付番号</th>
            <th className={`${StyleTableTh}`}>発注NO.</th>
            <th className={`${StyleTableTh}`}>発注日時</th>
            <th className={`${StyleTableTh}`}>送り先</th>
          </tr>
        </thead>
        <tbody>
          {shippingInvoices.map((shippingInvoice) => (
            <ShippingInvoicesTableRow
              key={shippingInvoice.id}
              shippingInvoice={shippingInvoice}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShippingInvoicesTable;
