"use client";

import React, { FC } from "react";
import OrderHistoryTableRow from "./order-history-table-row";
import { useGetOrderAll } from "@/hooks/useGetOrderAll";

const OrderHistoryTable: FC = () => {
  const { orders,isLoading  } = useGetOrderAll();
  console.log(orders);
  console.log(isLoading )
  
  const StyleTableTh = "py-2 px-1 text-left border-b";

  return (
    <div className="mt-12 w-full overflow-auto">
      <table className="w-full max-w-[calc(1500px)] min-w-[calc(1200px)]">
        <thead>
          <tr>
            <th className={`${StyleTableTh}`}>詳細</th>
            <th className={`${StyleTableTh}`}>受付番号</th>
            <th className={`${StyleTableTh}`}>発注NO.</th>
            <th className={`${StyleTableTh}`}>発注日時</th>
            <th className={`${StyleTableTh}`}>お届け先</th>
            <th className={`${StyleTableTh}`}>状況</th>
            <th className={`${StyleTableTh}`}>キャンセル</th>
            <th className={`${StyleTableTh}`}>処理</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <OrderHistoryTableRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;
