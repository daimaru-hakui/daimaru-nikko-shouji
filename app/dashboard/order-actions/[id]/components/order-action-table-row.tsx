import { useStore } from "@/store/index";
import { OrderDetail } from "@/types/index";
import { Checkbox } from "@material-tailwind/react";
import React, { FC, useEffect, useState } from "react";

interface Props {
  orderDetail: OrderDetail;
}
const OrderHistoryTableRow: FC<Props> = ({ orderDetail }) => {
  const checkedOrders = useStore((state) => state.checkedOrders);
  const setCheckedOrders = useStore((state) => state.setCheckedOrders);
  const removeCheckedOrders = useStore((state) => state.removeCheckedOrders);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedOrders([orderDetail]);
    } else {
      removeCheckedOrders(orderDetail);
    }
  };

  useEffect(() => {
    const findOrder = checkedOrders.find(
      (order) => order.id === orderDetail.id
    );
    const result = findOrder ? true : false;
    setIsChecked(result);
  }, [checkedOrders, orderDetail.id]);

  const StyleTableTd = "";
  return (
    <tr>
      <td>
        <Checkbox
          checked={isChecked}
          onChange={handleChecked}
          crossOrigin={undefined}
        />
      </td>
      <td className={`${StyleTableTd}`}>{orderDetail.suppliers.name}</td>
      <td className={`${StyleTableTd}`}>
        <div className="flex gap-6">
          <div>{orderDetail.product_number}</div>
          <div>{orderDetail.color}</div>
        </div>
        <div>{orderDetail.product_name}</div>
      </td>
      <td className={`${StyleTableTd} w-25`}>
        <div>{orderDetail?.size}</div>
        <div className="text-center">{orderDetail?.order_quantity}</div>
      </td>
      <td className={`${StyleTableTd} text-center`}>{orderDetail?.quantity}</td>
      <td className={`${StyleTableTd} text-center`}>
        {orderDetail?.order_quantity - orderDetail?.quantity}
      </td>
      <td className={`${StyleTableTd}`}>
        {orderDetail?.processing ? "あり" : ""}
      </td>
      <td className={`${StyleTableTd}`}>{orderDetail?.comment}</td>
      <td>出荷済み</td>
    </tr>
  );
};

export default OrderHistoryTableRow;
