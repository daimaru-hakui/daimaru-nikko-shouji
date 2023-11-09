import { ShippingDetailHistory, ShippingHistory } from "@/types/index";
import { zeroPadding } from "@/utils/functions";
import { Button } from "@material-tailwind/react";
import { format } from "date-fns";
import React, { FC } from "react";

interface Props {
  shippingHistory: ShippingDetailHistory;
}

const ShippingHistoriesTableRow: FC<Props> = ({ shippingHistory }) => {
  const StyleTableTd = "py-0.5 px-1 text-left border-b";
  return (
    <tr>
      <td className={`${StyleTableTd}`}>
        {zeroPadding(shippingHistory.shipping_history_id)}
      </td>
      <td className={`${StyleTableTd}`}>
        {zeroPadding(shippingHistory.order_details.order_id)}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingHistory.shipping_histories.orders.order_number}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingHistory.order_details.product_number}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingHistory.order_details.product_name}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingHistory.order_details.size}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingHistory.order_details.color}
      </td>
      <td className={`${StyleTableTd}`}>{shippingHistory.quantity}</td>
      <td className={`${StyleTableTd}`}>{shippingHistory.order_details.processing ? "あり" : ""}</td>
      <td className={`${StyleTableTd}`}>
        {format(new Date(shippingHistory.shipping_histories.shipping_date), "yyyy年MM月dd日")}
      </td>

      <td className={`${StyleTableTd} text-center`}>
        {shippingHistory.shipping_histories.shipping_addresses.name}
      </td>
    </tr>
  );
};

export default ShippingHistoriesTableRow;
