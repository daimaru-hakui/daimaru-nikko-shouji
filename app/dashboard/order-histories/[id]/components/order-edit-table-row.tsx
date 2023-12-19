import { OrderDetail } from "@/types/index";
import React, { FC } from "react";

interface Props {
  orderDetail: OrderDetail;
}

const OrderEditTableRow: FC<Props> = ({ orderDetail }) => {
  const StyleTableTd = "";
  return (
    <tr>
      <td className={`${StyleTableTd}`}>{orderDetail.suppliers.name}</td>
      <td className={`${StyleTableTd}`}>
        <div className="flex gap-6">
          <div>{orderDetail.productNumber}</div>
          <div>{orderDetail.color}</div>
        </div>
        <div>{orderDetail.productName}</div>
      </td>
      <td className={`${StyleTableTd} w-25`}>
        <div>{orderDetail?.size}</div>
        <div className="text-center">{orderDetail?.orderQuantity}</div>
      </td>
      <td className={`${StyleTableTd} text-center`}>{orderDetail?.quantity}</td>
      <td className={`${StyleTableTd} text-center`}>
        {orderDetail?.orderQuantity - orderDetail?.quantity}
      </td>
      <td className={`${StyleTableTd}`}>
        {orderDetail?.processing ? "あり" : ""}
      </td>
      <td className={`${StyleTableTd}`}>{orderDetail?.comment}</td>
      <td>出荷済み</td>
    </tr>
  );
};

export default OrderEditTableRow;
