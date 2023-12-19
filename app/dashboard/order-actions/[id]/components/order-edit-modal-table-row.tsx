import { useGetSupplierAll } from "@/hooks/useGetSupplierAll";
import { OrderContent, OrderDetail, ShippingInputs } from "@/types/index";
import { Input, Switch } from "@material-tailwind/react";
import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  detail: OrderDetail;
  methods: UseFormReturn<Inputs, any, undefined>;
  idx: number;
}

type Inputs = {
  shippingAddressId: string;
  orderDetails: OrderDetail[];
};

const OrderEditModalTableRow: FC<Props> = ({ detail, methods, idx }) => {
  const { register, setValue, watch } = methods;
  const { suppliers } = useGetSupplierAll();

  //   const orderDetailId = detail.id;
  //   setValue(`contents.${idx}.orderDetailId`, orderDetailId);

  const quantity =
    detail.quantity - watch(`orderDetails.${idx}.quantity`) >= 0
      ? detail.quantity - watch(`orderDetails.${idx}.quantity`)
      : 0;
  setValue(`orderDetails.${idx}.remainingQuantity`, quantity);
  // const reduceSum = (detail: OrderDetail) => {
  //   const array = detail.shipping_details.map((detail) => detail.quantity);
  //   const sum = array.reduce((prev, current) => prev + current, 0);
  //   return sum;
  // };

  const StyleTableTd = "p-1 text-left text-black border-b";
  const inputStyle = "p-2";

  return (
    <tr key={detail.id} className="">
      <td className={`${StyleTableTd}`}>
        <select
          style={{ padding: "0.5rem" }}
          className={`${inputStyle}`}
          defaultValue={detail.supplierId}
          {...register(`orderDetails.${idx}.supplierId`)}
        >
          <option value="">選択してください</option>
          {suppliers?.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </td>
      <td className={`${StyleTableTd}`}>
        <input
          autoComplete="off"
          list="productNumbers"
          className={`${inputStyle} max-w-[calc(120px)]`}
          {...register(`orderDetails.${idx}.productNumber`, { maxLength: 200 })}
        />
      </td>
      <td className={`${StyleTableTd}`}>
        <input
          className={`${inputStyle}`}
          {...register(`orderDetails.${idx}.productName`, { maxLength: 200 })}
        />
      </td>
      <td className={`${StyleTableTd}`}>
        <input
          className={`${inputStyle}`}
          {...register(`orderDetails.${idx}.color`, { maxLength: 200 })}
        />
      </td>
      <td className={`${StyleTableTd} text-center`}>
        <input
          className={`${inputStyle} max-w-[calc(80px)]`}
          {...register(`orderDetails.${idx}.size`, { maxLength: 200 })}
        />
      </td>
      <td className={`${StyleTableTd} text-center`}>
        <input
          type="number"
          className={`${inputStyle}`}
          style={{ width: "80px" }}
          defaultValue={detail.orderQuantity}
          {...register(`orderDetails.${idx}.orderQuantity`, {
            min: 0,
          })}
        />
      </td>
      <td className={`${StyleTableTd} text-center`}>
        <input
          type="number"
          className={`${inputStyle}`}
          style={{ width: "80px" }}
          defaultValue={detail.quantity}
          {...register(`orderDetails.${idx}.quantity`, {
            min: 1,
           
          })}
        />
      </td>
      <td className={`${StyleTableTd} text-center`}>
        <input
          type="number"
          className={`${inputStyle}`}
          style={{ width: "80px" }}
          {...register(`orderDetails.${idx}.price`)}
        />
      </td>
      {/* <td className={`${StyleTableTd} text-center`}>{reduceSum(detail)}</td> */}
      <td className={`${StyleTableTd}  min-w-[calc(100px)]`}>
        <div className="flex justify-center">
          <Switch
            crossOrigin={undefined}
            {...register(`orderDetails.${idx}.processing`)}
          />
        </div>
      </td>
      <td className={`${StyleTableTd}`}>
        <input
          className={`${inputStyle}`}
          {...register(`orderDetails.${idx}.comment`, { maxLength: 200 })}
        />
      </td>
    </tr>
  );
};

export default OrderEditModalTableRow;
