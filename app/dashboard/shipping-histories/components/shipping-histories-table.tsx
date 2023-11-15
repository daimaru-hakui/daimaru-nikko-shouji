"use client"
import React, { FC } from "react";
import ShippingHistoriesTableRow from "./shipping-histories-table-row";
import { useGetShippingHistoryAll } from "@/hooks/useGetShippingHistoryAll";

const ShippingHistoriesTable: FC = () => {
  const { shippingHistories } = useGetShippingHistoryAll();
  const StyleTableTh = "text-left border-b";
  return (
    <div className="mt-12 w-full overflow-auto">
      <table className="w-full max-w-[calc(1200px)] min-w-[calc(1200px)]">
        <thead>
          <tr>
            <th className={`${StyleTableTh}`}>出荷番号</th>
            <th className={`${StyleTableTh}`}>受付番号</th>
            <th className={`${StyleTableTh}`}>発注NO.</th>
            <th className={`${StyleTableTh}`}>品番</th>
            <th className={`${StyleTableTh}`}>品名</th>
            <th className={`${StyleTableTh}`}>サイズ</th>
            <th className={`${StyleTableTh}`}>カラー</th>
            <th className={`${StyleTableTh}`}>数量</th>
            <th className={`${StyleTableTh}`}>二次加工</th>
            <th className={`${StyleTableTh}`}>出荷日時</th>
            <th className={`${StyleTableTh}`}>送り先</th>
          </tr>
        </thead>
        <tbody>
          {shippingHistories.map((shippingHistory) => (
            <ShippingHistoriesTableRow
              key={shippingHistory.id}
              shippingHistory={shippingHistory}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShippingHistoriesTable;