import { Order, ShippingSchedule } from "@/types/index";
import { zeroPadding } from "@/utils/functions";
import { format } from "date-fns";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";



interface Props {
  shippingSchedule: ShippingSchedule;
  // isCheckedHandler: (id: number) => boolean;
}

const ShippingSchedulesTableRow: FC<Props> = ({
  shippingSchedule,
  // isCheckedHandler,
}) => {
  // const currentUser = useStore((state) => state.currentUser);
  // const setCheckedOrders = useStore((state) => state.setCheckedOrders);
  // const removeCheckedOrders = useStore((state) => state.removeCheckedOrders);
  // const [isChecked, setIsChecked] = useState(false);

  // const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.checked) {
  //     setCheckedOrders([shippingSchedule]);
  //   } else {
  //     removeCheckedOrders(shippingSchedule);
  //   }
  // };

  // useEffect(() => {
  //   const result = isCheckedHandler(shippingSchedule.id);
  //   setIsChecked(result);
  // }, [shippingSchedule.id, isCheckedHandler]);

  const StyleTableTd = "py-0.5 px-1 text-left border-b";
  return (
    <tr
      key={shippingSchedule.id}
      style={{
        backgroundColor:
          shippingSchedule.orders?.orderStatus === "CANCEL"
            ? "#ccc"
            : "",
      }}
    >
      <td className={`${StyleTableTd}`}>
        <Link
          href={`/dashboard/order-actions/${shippingSchedule.orders?.id}`}
        >
          <span className="underline text-blue-500">{zeroPadding(shippingSchedule.orders?.id)}</span>
        </Link>
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingSchedule.orders?.orderNumber}
      </td>
      <td className={`${StyleTableTd}`}>
        {format(new Date(shippingSchedule.createdAt), "yyyy年MM月dd日")}
      </td>
      <td className={`${StyleTableTd}`}>{shippingSchedule.suppliers?.name}</td>
      <td className={`${StyleTableTd}`}>{shippingSchedule.productNumber}</td>
      <td className={`${StyleTableTd}`}>{shippingSchedule?.productName}</td>
      <td className={`${StyleTableTd}`}>{shippingSchedule?.color}</td>
      <td className={`${StyleTableTd} text-center`}>
        {shippingSchedule?.size}
      </td>
      <td className={`${StyleTableTd} text-center`}>
        {shippingSchedule?.quantity}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingSchedule.orders?.shippingAddresses?.name}
      </td>
      <td className={`${StyleTableTd}`}>
        {shippingSchedule?.processing ? "二次加工" : ""}
      </td>
      <td className={`${StyleTableTd}`}>{shippingSchedule?.comment}</td>
    </tr>
  );
};

export default ShippingSchedulesTableRow;