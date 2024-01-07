"use client";
import { useGetOrderById } from "@/hooks/useGetOrderById";
import { useParams } from "next/navigation";
import React, { FC } from "react";
import OrderEditTableRow from "./order-edit-table-row";
import { UseFormReturn } from "react-hook-form";
import { Order } from "@/types/index";
import OrderEditTableHeader from "./order-edit-table-header";

type Inputs = Order;

type Props = {
  methods: UseFormReturn<Inputs, any, undefined>;
};

const OrderEditTable: FC<Props> = ({ methods }) => {
  const params = useParams();
  const { order } = useGetOrderById({ id: Number(params.id) });

  return (
    <div className="w-full mt-6 overflow-auto">
      <table className="w-full max-w-[calc(1500px)] min-w-[calc(1100px)]">
        <thead>
          <OrderEditTableHeader />
        </thead>
        <tbody>
          {order?.orderDetails?.map((orderDetail, idx) => (
            <OrderEditTableRow
              key={orderDetail.id}
              orderDetail={orderDetail}
              methods={methods}
              idx={idx}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderEditTable;
