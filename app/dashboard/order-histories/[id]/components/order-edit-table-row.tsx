import { useGetSupplierAll } from "@/hooks/useGetSupplierAll";
import { Order, OrderDetail } from "@/types/index";
import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";

type Inputs = Order;

interface Props {
  orderDetail: OrderDetail;
  methods: UseFormReturn<Inputs, any, undefined>;
  idx: number;
}

const OrderEditTableRow: FC<Props> = ({ orderDetail, methods, idx }) => {
  const { register } = methods;
  const { suppliers } = useGetSupplierAll();
  const StyleTableTd = "";
  const StyleInput = "py-1 px-2 w-full";
  return (
    <tr>
      <td className={`${StyleTableTd}`}>
        <select
        style={{ width: "180px" }}
          className={`${StyleInput}`}
          {...register(`orderDetails.${idx}.supplierId`)}
        >
          {suppliers?.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </td>
      <td className={`${StyleTableTd}`}>
        <input
          className={`${StyleInput}`}
          {...register(`orderDetails.${idx}.productNumber`)}
        />
      </td>
      <td className={`${StyleTableTd}`}>
        <input
          className={`${StyleInput}`}
          {...register(`orderDetails.${idx}.productName`)}
        />
      </td>
      <td className={`${StyleTableTd}`}>
        <input
          className={`${StyleInput}`}
          {...register(`orderDetails.${idx}.color`)}
        />
      </td>
      <td className={`${StyleTableTd} w-25`}>
        <input
          style={{ width: "80px" }}
          className={`${StyleInput}`}
          {...register(`orderDetails.${idx}.size`)}
        />
      </td>
      <td className={`${StyleTableTd} w-25`}>
        <input
          type="number"
          style={{ width: "80px" }}
          className={`${StyleInput}`}
          {...register(`orderDetails.${idx}.orderQuantity`)}
        />
      </td>
      <td className={`${StyleTableTd} text-center`}>
        <input
          type="number"
          style={{ width: "80px" }}
          className={`${StyleInput}`}
          {...register(`orderDetails.${idx}.quantity`)}
        />
      </td>
      <td style={{ width: "80px" }} className={`${StyleTableTd} text-center`}>
        {orderDetail?.orderQuantity - orderDetail?.quantity}
      </td>
      <td style={{ width: "100px" }} className={`${StyleTableTd}`}>
        {orderDetail?.processing ? "あり" : ""}
      </td>
      <td style={{ width: "100px" }} className={`${StyleTableTd}`}>
        {orderDetail?.comment}
      </td>
      <td style={{ width: "100px" }}>出荷済み</td>
    </tr>
  );
};

export default OrderEditTableRow;
