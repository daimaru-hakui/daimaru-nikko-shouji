import { ShippingHistory } from "@/types/index";
import { zeroPadding } from "@/utils/functions";
import { Button } from "@material-tailwind/react";
import { format } from "date-fns";
import React, { FC } from "react";

interface Props {
  shippingInvoice: ShippingHistory;
}

const ShippingInvoicesTableRow: FC<Props> = ({ shippingInvoice }) => {
  const StyleTableTd = "py-0.5 px-1 text-left border-b";
  return (
    <tr>
      <td className={`${StyleTableTd}`}><Button size="sm">詳細</Button></td>
      <td className={`${StyleTableTd}`}>{zeroPadding(shippingInvoice.id)}</td>
      <td className={`${StyleTableTd}`}>{zeroPadding(shippingInvoice.orderId)}</td>
      <td className={`${StyleTableTd}`}>{shippingInvoice.orders.orderNumber}</td>
      <td className={`${StyleTableTd}`}>
        {format(new Date(shippingInvoice.createdAt), "yyyy年MM月dd日")}
      </td>

      <td className={`${StyleTableTd} text-center`}>
        {shippingInvoice?.shippingAddresses?.name}
      </td>
    </tr>
  );
};

export default ShippingInvoicesTableRow;
