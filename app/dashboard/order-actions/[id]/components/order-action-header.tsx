"use client";
import { useGetOrderById } from "@/hooks/useGetOrderById";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import React from "react";
import OrderActionModal from "./order-action-modal";
import { useStore } from "@/store/index";
import { zeroPadding } from "@/utils/functions";

const OrderHistoryHeader = () => {
  const params = useParams();
  const { order } = useGetOrderById({ id: Number(params.id) });
  const checkedOrders = useStore((state) => state.checkedOrders);
  return (
    <>
      <div className="mt-12 flex gap-12">
        <div>
          <div className="text-sm text-gray-600">受付番号</div>
          <div className="text-black">{zeroPadding(Number(order?.id))}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">貴社発注番号</div>
          <div className="text-black">{order?.orderNumber}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">発注日時</div>
          <div className="text-black">
            {order?.createdAt &&
              format(new Date(order?.createdAt), "yyyy年MM月dd日 HH時mm分")}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600">送り先</div>
          <div className="text-black">{order?.shippingAddresses?.name}</div>
        </div>
      </div>
      <div className="mt-3 h-[calc(50px)]">
        {order && checkedOrders.length > 0 && (
          <div className="flex gap-3">
            <OrderActionModal order={order} />
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistoryHeader;
