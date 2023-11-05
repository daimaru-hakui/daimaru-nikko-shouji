"use client";
import { Checkbox } from "@material-tailwind/react";
import React, { FC, useCallback, useEffect } from "react";
import ShippingScheduleTableRow from "./shipping-schedules-table-row";
// import { useStore } from "@/store";
// import useAuth from "@/hooks/useAuth";
import { useGetShippingScheduleAll } from "@/hooks/useGetShippingScheduleAll";


interface Props {
  userId: string;
}

const ShippingSchedulesTable: FC<Props> = ({ userId }) => {
  const { shippingSchedules } = useGetShippingScheduleAll();
  console.log(shippingSchedules);

  const StyleTableTh = "py-0.5 px-1 text-left border-b";
  return (
    <div className="mt-12 w-full overflow-auto">
      <table className="w-full max-w-[calc(1500px)] min-w-[calc(1500px)]">
        <thead>
          <tr>
            <th className={`${StyleTableTh}`}>受付番号</th>
            <th className={`${StyleTableTh}`}>発注NO.</th>
            <th className={`${StyleTableTh}`}>発注日時</th>
            <th className={`${StyleTableTh}`}>メーカー</th>
            <th className={`${StyleTableTh}`}>品番</th>
            <th className={`${StyleTableTh}`}>品名</th>
            <th className={`${StyleTableTh}`}>カラー</th>
            <th className={`${StyleTableTh} text-center`}>サイズ</th>
            <th className={`${StyleTableTh} text-center`}>数量</th>
            <th className={`${StyleTableTh}`}>送り先</th>
            <th className={`${StyleTableTh}`}>区分</th>
            <th className={`${StyleTableTh}`}>コメント</th>
          </tr>
        </thead>
        <tbody>
          {shippingSchedules.map((shippingSchedule) => (
            <ShippingScheduleTableRow
              key={shippingSchedule.id}
              shippingSchedule={shippingSchedule}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShippingSchedulesTable;