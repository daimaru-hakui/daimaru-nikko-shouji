"use client";
import { useGetOrderById } from "@/hooks/useGetOrderById";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import OrderHistoryTableRow from "./order-action-table-row";
import { Checkbox } from "@material-tailwind/react";
import { useStore } from "@/store/index";
import OrderEditModal from "./order-edit-modal";

const OrderHistoryTable = () => {
  const params = useParams();
  const { order } = useGetOrderById({ id: Number(params.id) });
  const checkedOrders = useStore((state) => state.checkedOrders);
  const setCheckedOrders = useStore((state) => state.setCheckedOrders);
  const resetCheckedOrders = useStore((state) => state.resetCheckedOrders);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (!order?.order_details) return;
      setCheckedOrders([...order?.order_details]);
    } else {
      resetCheckedOrders();
    }
  };

  useEffect(() => {
    return () => {
      resetCheckedOrders();
    };
  }, []);

  const StyleTableTh = "";

  return (
    <div className="w-full overflow-auto">
      <table className="w-full max-w-[calc(1500px)] min-w-[calc(1100px)]">
        <thead>
          <tr>
            <th className={`${StyleTableTh}`}>
              <Checkbox
                checked={checkedOrders.length > 0 ? true : false}
                onChange={handleChecked}
                crossOrigin={undefined}
              />
            </th>
            <th className={`${StyleTableTh}`}>メーカー</th>
            <th className={`${StyleTableTh}`}>品番/品名/カラー</th>
            <th className={`${StyleTableTh}`}>サイズ/発注数</th>
            <th className={`${StyleTableTh}`}>状態</th>
            <th className={`${StyleTableTh}`}>残数</th>
            <th className={`${StyleTableTh}`}>出荷数</th>
            <th className={`${StyleTableTh}`}>二次加工</th>
            <th className={`${StyleTableTh}`}>コメント</th>
          </tr>
        </thead>
        <tbody>
          {order?.order_details?.map((orderDetail) => (
            <OrderHistoryTableRow
              key={orderDetail.id}
              orderDetail={orderDetail}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;
