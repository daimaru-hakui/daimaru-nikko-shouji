"use client";
import { useGetOrderById } from "@/hooks/useGetOrderById";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import React, { FC } from "react";
import { useStore } from "@/store/index";
import { zeroPadding } from "@/utils/functions";
import { UseFormReturn } from "react-hook-form";
import { Order } from "@/types/index";

type Inputs = Order;

type Props = {
  methods: UseFormReturn<Inputs, any, undefined>;
};

const OrderEditHeader: FC<Props> = ({ methods }) => {
  const params = useParams();
  const { order } = useGetOrderById({ id: Number(params.id) });
  const { register } = methods;

  return (
    <>
      <div className="mt-12 flex gap-12">
        <div>
          <div className="text-sm text-gray-600">受付番号</div>
          <div className="text-black">{zeroPadding(Number(order?.id))}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">貴社発注番号</div>
          <input className="p-1 text-black" {...register("orderNumber")} />
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
      {/* <div className="mt-3 h-[calc(50px)]">
        {order && checkedOrders.length > 0 && (
          <div className="flex gap-3">
            <OrderActionModal order={order} />
            <OrderEditModal order={order} />
          </div>
        )}
      </div> */}
    </>
  );
};

export default OrderEditHeader;
