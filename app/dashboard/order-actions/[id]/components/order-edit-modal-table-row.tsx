import { useGetSupplierAll } from "@/hooks/useGetSupplierAll";
import { OrderDetail, ShippingInputs } from "@/types/index";
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
  contents: {
    supplierId: number;
    productNumber: string;
    productName: string;
    color: string;
    size: string;
    orderQuantity: number;
    price: number;
    quantity: number;
    remainingQuantity: number;
    processing: boolean;
    comment: string;
  }[];
};

const OrderEditModalTableRow: FC<Props> = ({ detail, methods, idx }) => {
  const { register, setValue, watch } = methods;
  const { suppliers } = useGetSupplierAll();

  //   const orderDetailId = detail.id;
  //   setValue(`contents.${idx}.orderDetailId`, orderDetailId);

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

  const StyleTableTd = "p-1 text-left text-black border-b";
  const inputStyle = "p-2";

  return (
    <tr key={detail.id} className="">
      <td className={`${StyleTableTd}`}>
        <select
          style={{ padding: "0.5rem" }}
          className={`${inputStyle}`}
          defaultValue={detail.supplier_id}
          {...register(`contents.${idx}.supplierId`)}
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
          {...register(`contents.${idx}.productNumber`, { maxLength: 200 })}
        />
      </td>
      <td className={`${StyleTableTd}`}>
        <input
          className={`${inputStyle}`}
          {...register(`contents.${idx}.productName`, { maxLength: 200 })}
        />
      </td>
      <td className={`${StyleTableTd}`}>
        <input
          className={`${inputStyle}`}
          {...register(`contents.${idx}.color`, { maxLength: 200 })}
        />
      </td>
      <td className={`${StyleTableTd} text-center`}>
        <input
          className={`${inputStyle} max-w-[calc(80px)]`}
          {...register(`contents.${idx}.size`, { maxLength: 200 })}
        />
      </td>
      <td className={`${StyleTableTd} text-center`}>
        <input
          type="number"
          className={`${inputStyle}`}
          style={{ width: "80px" }}
          defaultValue={detail.quantity}
          {...register(`contents.${idx}.quantity`, {
            min: 1,
            max: detail.quantity,
          })}
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
      <td className={`${StyleTableTd}  min-w-[calc(100px)]`}>
        <div className="flex justify-center">
          <Switch
            crossOrigin={undefined}
            {...register(`contents.${idx}.processing`)}
          />
        </div>
      </td>
      <td className={`${StyleTableTd}`}>
        <input
          className={`${inputStyle}`}
          {...register(`contents.${idx}.comment`, { maxLength: 200 })}
        />
      </td>
    </tr>
  );
};

export default OrderEditModalTableRow;
