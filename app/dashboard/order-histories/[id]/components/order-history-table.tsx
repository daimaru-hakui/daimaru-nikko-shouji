"use client";
import { useGetOrderById } from '@/hooks/useGetOrderById';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import OrderHistoryTableRow from './order-history-table-row';
import { Checkbox } from '@material-tailwind/react';
import { useStore } from '@/store/index';

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
      <table className="w-full max-w-[calc(1500px)] min-w-[calc(1200px)]">
        <thead>
          <tr>
            <th className={`${StyleTableTh}`}>
              <Checkbox
                checked={checkedOrders.length > 0 ? true : false}
                onChange={handleChecked}
                crossOrigin={undefined}
              /></th>
            <th className={`${StyleTableTh}`}>メーカー</th>
            <th className={`${StyleTableTh}`}>品番</th>
            <th className={`${StyleTableTh}`}>品名</th>
            <th className={`${StyleTableTh}`}>カラー</th>
            <th className={`${StyleTableTh}`}>サイズ</th>
            <th className={`${StyleTableTh}`}>発注数量</th>
            <th className={`${StyleTableTh}`}>残数量</th>
            <th className={`${StyleTableTh}`}>出荷数量</th>
            <th className={`${StyleTableTh}`}>二次加工</th>
            <th className={`${StyleTableTh}`}>コメント</th>
          </tr>
        </thead>
        <tbody>
          {order?.order_details?.map((orderDetail) => (
            <OrderHistoryTableRow key={orderDetail.id} orderDetail={orderDetail} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;