"use client";
import { useGetOrderById } from '@/hooks/useGetOrderById';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';
import React from 'react';
import OrderHistoryModal from './order-history-modal';
import { useStore } from '@/store/index';
import { zeroPadding } from '@/utils/functions';

const OrderHistoryHeader = () => {
  const params = useParams();
  const { order } = useGetOrderById({ id: Number(params.id) });
  const checkedOrders = useStore((state) => state.checkedOrders);
  return (
    <>
      <div className="mt-12 flex gap-6">
        <div>
          <div className="text-sm">受付番号</div>
          <div className="ml-4 text-black">{zeroPadding(Number(order?.id))}</div>
        </div>
        <div>
          <div className="text-sm">貴社発注ナンバー</div>
          <div className="ml-4 text-black">{order?.order_number}</div>
        </div>
      </div>
      <div className="mt-6 flex gap-6">
        <div>
          <div className="text-sm">発注日時</div>
          <div className="ml-4 text-black">
            {order?.created_at && format(new Date(order?.created_at), "yyyy年MM月dd日 HH時mm分")}
          </div>
        </div>
      </div>
      <div className="mt-6 flex gap-6">
        <div>
          <div className="text-sm">送り先</div>
          <div className="ml-4 text-black">
            {order?.shipping_addresses?.name}
          </div>
        </div>
      </div>
      <div className='mt-6 h-[calc(50px)]'>
        {order && checkedOrders.length > 0 && (
          <OrderHistoryModal order={order} />
        )}
      </div>
    </>
  );
};

export default OrderHistoryHeader;