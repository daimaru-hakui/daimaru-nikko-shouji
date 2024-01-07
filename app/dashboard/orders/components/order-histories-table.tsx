"use client";

import React, { FC } from "react";
import OrderHistoriesTableRow from "./order-histories-table-row";
import { useGetOrderAll } from "@/hooks/useGetOrderAll";

const OrderHistoriesTable: FC = () => {
  const { orders, isLoading } = useGetOrderAll();

  const StyleTableTh = "";

  console.log(orders)

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
            <OrderHistoriesTableRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoriesTable;
