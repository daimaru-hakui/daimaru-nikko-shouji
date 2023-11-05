import { useStore } from '@/store/index';
import { OrderDetail } from '@/types/index';
import { Checkbox } from '@material-tailwind/react';
import React, { FC, useEffect, useState } from 'react';

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
    const findOrder = checkedOrders.find((order) => (order.id === orderDetail.id));
    const result = findOrder ? true : false;
    setIsChecked(result);
  }, [checkedOrders, orderDetail.id]);
  console.log(checkedOrders);

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
      <td className={`${StyleTableTd}`}>
        {orderDetail.suppliers.name}
      </td>
      <td className={`${StyleTableTd}`}>
        {orderDetail.product_number}
      </td>
      <td className={`${StyleTableTd}`}>{orderDetail.product_name}</td>
      <td className={`${StyleTableTd}`}>{orderDetail.color}</td>
      <td className={`${StyleTableTd}`}>{orderDetail?.size}</td>
      <td className={`${StyleTableTd} text-center`}>{orderDetail?.order_quantity}</td>
      <td className={`${StyleTableTd} text-center`}>
        {orderDetail?.quantity}
      </td>
      <td className={`${StyleTableTd} text-center`}>
        {orderDetail?.order_quantity - orderDetail?.quantity}
      </td>
      <td className={`${StyleTableTd}`}>
        {orderDetail?.processing ? "二次加工" : ""}
      </td>
      <td className={`${StyleTableTd}`}>{orderDetail?.comment}</td>
    </tr>
  );
};

export default OrderHistoryTableRow;