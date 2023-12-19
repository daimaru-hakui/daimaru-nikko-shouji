"use client";
import { Button } from "@material-tailwind/react";
import React, { FC } from "react";
import { format } from "date-fns";
import { Order, OrderStatus } from "@/types/index";
import OrderHistoryModal from "./order-histories-modal";
import Link from "next/link";
import { zeroPadding } from "@/utils/functions";
import { useStore } from "@/store/index";
import { useMutationOrderStatus } from "@/hooks/useMutationOrderStatus";

interface Props {
  order: Order;
}

const OrderHistoriesTableRow: FC<Props> = ({ order }) => {
  const { usePatchOrderStatusSelect } = useMutationOrderStatus();
  const currentUser = useStore((state) => state.currentUser);

  const handleChangeStatus = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    order: Order
  ) => {
    const status = e.target.value as OrderStatus;
    const { mutate } = usePatchOrderStatusSelect;
    mutate({ ...order, orderStatus: status });
  };

  const handleClickCancel = async () => {
    const { mutate } = usePatchOrderStatusSelect;
    mutate({ ...order, orderStatus: "CANCEL" });
  };

  const getStatus = (status: OrderStatus) => {
    switch (status) {
      case "UNREAD":
        return "処理中";
      case "READ":
        return "受付済み";
      case "ARRANGE":
        return "準備中";
      case "CANCEL":
        return "キャンセル済";
      case "SHIPPING":
        return "完了";
      default:
        return "-";
    }
  };

  const StyleTableTd = "py-1 px-1 text-left border-b";

  return (
    <tr
      key={order.id}
      style={{ backgroundColor: order.orderStatus === "CANCEL" ? "#ddd" : "" }}
    >
      <td className={`${StyleTableTd} w-[calc(250px)] pl-2`}>
        <div className="flex gap-2">
          <OrderHistoryModal order={order} />
          {currentUser?.role === "ADMIN" && (
            <>
              <Link href={`/dashboard/order-actions/${order.id}`}>
                <Button size="sm">処理</Button>
              </Link>
              <Link href={`/dashboard/order-histories/${order.id}`}>
                <Button size="sm">編集</Button>
              </Link>
            </>
          )}
        </div>
      </td>
      <td className={`${StyleTableTd}`}>{zeroPadding(order.id)}</td>
      <td className={`${StyleTableTd}`}>{order.orderNumber}</td>
      <td className={`${StyleTableTd}`}>
        {format(new Date(order.createdAt), "yyyy年MM月dd日 HH時mm分")}
      </td>
      <td className={`${StyleTableTd}`}>{order?.shippingAddresses?.name}</td>
      <td className={`${StyleTableTd}`}>{getStatus(order.orderStatus)}</td>
      <td className={`${StyleTableTd}`}>
        {order.orderStatus === "UNREAD" && (
          <Button className="py-2 px-4" size="sm" onClick={handleClickCancel}>
            キャンセル
          </Button>
        )}
      </td>

      <td className={`${StyleTableTd}`}>
        <select
          style={{ padding: "0.5rem" }}
          value={order.orderStatus}
          onChange={(e) => handleChangeStatus(e, order)}
        >
          <option value="UNREAD">未読</option>
          <option value="READ">既読</option>
          <option value="ARRANGE">手配済み</option>
          <option value="SHIPPING">出荷</option>
        </select>
      </td>
    </tr>
  );
};

export default OrderHistoriesTableRow;
