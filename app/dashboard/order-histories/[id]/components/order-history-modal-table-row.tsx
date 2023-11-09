import { useGetSupplierAll } from "@/hooks/useGetSupplierAll";
import { OrderDetail, ShippingInputs } from "@/types/index";
import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  detail: OrderDetail;
  methods: UseFormReturn<Inputs, any, undefined>;
  idx: number;
}

type Inputs =ShippingInputs;

const OrderHistoryModalTableRow: FC<Props> = ({ detail, methods, idx }) => {
  const { register, setValue, watch } = methods;
  const { suppliers } = useGetSupplierAll();

  const orderDetailId = detail.id;
  setValue(`contents.${idx}.orderDetailId`, orderDetailId);

  const quantity =
    detail.quantity - watch(`contents.${idx}.quantity`) >= 0
      ? detail.quantity - watch(`contents.${idx}.quantity`)
      : 0;
  setValue(`contents.${idx}.remainingQuantity`, quantity);
  // const reduceSum = (detail: OrderDetail) => {
  //   const array = detail.shipping_details.map((detail) => detail.quantity);
  //   const sum = array.reduce((prev, current) => prev + current, 0);
  //   return sum;
  // };

  const StyleTableTd = "px-2 py-2 text-left text-black border-b";
  const inputStyle = "m-0.5 p-2";

  return (
    <tr key={detail.id}>
      <td className={`${StyleTableTd}`}>{detail.suppliers?.name}</td>
      <td className={`${StyleTableTd}`}>{detail.product_number}</td>
      <td className={`${StyleTableTd}`}>{detail.product_name}</td>
      <td className={`${StyleTableTd}`}>{detail.color}</td>
      <td className={`${StyleTableTd} text-center`}>{detail.size}</td>
      <td className={`${StyleTableTd} text-center`}>{detail.order_quantity}</td>
      <td className={`${StyleTableTd} text-center`}>{detail.quantity}</td>
      <td className={`${StyleTableTd} text-center`}>
        <input
          type="number"
          className={`${inputStyle}`}
          style={{ width: "80px" }}
          defaultValue={detail.quantity}
          {...register(`contents.${idx}.quantity`, { min: 1 })}
        />
      </td>
      <td className={`${StyleTableTd} text-center`}>
        <input
          type="number"
          className={`${inputStyle}`}
          style={{ width: "80px" }}
          {...register(`contents.${idx}.remainingQuantity`)}
        />
      </td>
      {/* <td className={`${StyleTableTd} text-center`}>{reduceSum(detail)}</td> */}
      <td className={`${StyleTableTd} text-center`}>
        {detail.processing && "あり"}
      </td>
      <td className={`${StyleTableTd}`}>{detail.comment}</td>
    </tr>
  );
};

export default OrderHistoryModalTableRow;
