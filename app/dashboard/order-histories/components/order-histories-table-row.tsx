"use client";
import { Button } from "@material-tailwind/react";
import React, { FC } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
// import OrderHistoryModal from "./order-history-modal";
import { Order } from "@/types/index";
import OrderHistoryModal from "./order-histories-modal";
import Link from "next/link";
import { useMutationOrder } from "@/hooks/useMutationOrder";
import { zeroPadding } from "@/utils/functions";
import { useStore } from "@/store/index";

interface Props {
  order: Order;
}

const OrderHistoriesTableRow: FC<Props> = ({ order }) => {
  const { usePatchOrderStatusSelect } = useMutationOrder();
  const currentUser = useStore((state) => state.currentUser);

  const handleChangeStatus = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    order: Order
  ) => {
    const { mutate } = usePatchOrderStatusSelect;
    mutate({ ...order, order_status: e.target.value });
  };

  const handleClickCancel = async () => {
    const { mutate } = usePatchOrderStatusSelect;
    mutate({ ...order, order_status: "CANCEL" });
  };

  const getStatus = (status: string) => {
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
      style={{ backgroundColor: order.order_status === "CANCEL" ? "#ddd" : "" }}
    >
      <td className={`${StyleTableTd} w-[calc(140px)] pl-2`}>
        <div className="flex gap-2">
          <OrderHistoryModal order={order} />
          {currentUser?.role === "ADMIN" && (
            <Link href={`/dashboard/order-actions/${order.id}`}>
              <Button size="sm">処理</Button>
            </Link>
          )}
        </div>
      </td>
      <td className={`${StyleTableTd}`}>{zeroPadding(order.id)}</td>
      <td className={`${StyleTableTd}`}>{order.order_number}</td>
      <td className={`${StyleTableTd}`}>
        {format(new Date(order.created_at), "yyyy年MM月dd日 HH時mm分")}
      </td>
      <td className={`${StyleTableTd}`}>{order?.shipping_addresses?.name}</td>
      <td className={`${StyleTableTd}`}>{getStatus(order.order_status)}</td>
      <td className={`${StyleTableTd}`}>
        {order.order_status === "UNREAD" && (
          <Button className="py-2 px-4" size="sm" onClick={handleClickCancel}>
            キャンセル
          </Button>
        )}
      </td>

      <td className={`${StyleTableTd}`}>
        <select
          style={{ padding: "0.5rem" }}
          value={order.order_status}
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
