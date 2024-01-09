import { OrderDetail } from "@/types/index";
import React, { FC } from "react";

interface Props {
  detail: OrderDetail;
}

const OrderHistoriesModalTableRow: FC<Props> = ({ detail }) => {
  // const reduceSum = (detail: OrderDetail) => {
  //   const array = detail.shipping_details.map((detail) => detail.quantity);
  //   const sum = array.reduce((prev, current) => prev + current, 0);
  //   return sum;
  // };

  const StyleTableTd = "px-2 py-2 text-left text-black border-b";
  return (
    <tr key={detail.id}>
      <td className={`${StyleTableTd}`}>{detail.suppliers?.name}</td>
      <td className={`${StyleTableTd}`}>{detail.productNumber}</td>
      <td className={`${StyleTableTd}`}>{detail.productName}</td>
      <td className={`${StyleTableTd}`}>{detail.color}</td>
      <td className={`${StyleTableTd} text-center`}>{detail.size}</td>
      <td className={`${StyleTableTd} text-center`}>{detail.orderQuantity}</td>
      <td className={`${StyleTableTd} text-center`}>{detail.quantity}</td>
      {/* <td className={`${StyleTableTd} text-center`}>{reduceSum(detail)}</td> */}
      <td className={`${StyleTableTd} text-center`}>{detail.processing && "あり"}</td>
      <td className={`${StyleTableTd}`}>{detail.comment}</td>
    </tr>
  );
};

export default OrderHistoriesModalTableRow;