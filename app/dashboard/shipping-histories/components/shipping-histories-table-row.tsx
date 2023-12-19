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
        {zeroPadding(shippingHistory.shippingHistoryId)}
      </td>
      <td className={`${StyleTableTd}`}>
        {zeroPadding(shippingHistory.orderDetails.orderId)}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingHistory.shippingHistories.orders.orderNumber}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingHistory.orderDetails.productNumber}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingHistory.orderDetails.productName}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingHistory.orderDetails.size}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingHistory.orderDetails.color}
      </td>
      <td className={`${StyleTableTd}`}>{shippingHistory.quantity}</td>
      <td className={`${StyleTableTd}`}>{shippingHistory.orderDetails.processing ? "あり" : ""}</td>
      <td className={`${StyleTableTd}`}>
        {format(new Date(shippingHistory.shippingHistories.shippingDate), "yyyy年MM月dd日")}
      </td>

      <td className={`${StyleTableTd} text-center`}>
        {shippingHistory.shippingHistories.shippingAddresses.name}
      </td>
    </tr>
  );
};

export default ShippingHistoriesTableRow;
