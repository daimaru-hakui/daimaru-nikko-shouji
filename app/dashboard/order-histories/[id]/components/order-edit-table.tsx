"use client";
import { useGetOrderById } from "@/hooks/useGetOrderById";
import { useParams } from "next/navigation";
import React, { FC, useEffect } from "react";
import { Checkbox } from "@material-tailwind/react";
import { useStore } from "@/store/index";
import OrderEditTableRow from "./order-edit-table-row";
import { UseFormReturn } from "react-hook-form";
import { Order } from "@/types/index";
import OrderEditTableHeader from "./order-edit-table-header";

type Inputs = Order;

type Props = {
  methods: UseFormReturn<Inputs, any, undefined>;
};

const OrderEditTable: FC<Props> = ({methods}) => {
  const params = useParams();
  const { order } = useGetOrderById({ id: Number(params.id) });

  return (
    <div className="w-full mt-6 overflow-auto">
      <table className="w-full max-w-[calc(1500px)] min-w-[calc(1100px)]">
        <thead>
          <OrderEditTableHeader />
        </thead>
        <tbody>
          {order?.orderDetails?.map((orderDetail) => (
            <OrderEditTableRow key={orderDetail.id} orderDetail={orderDetail} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderEditTable;
