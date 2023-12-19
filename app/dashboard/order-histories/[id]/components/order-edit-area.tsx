"use client";
import React from "react";
import OrderEditHeader from "./order-edit-header";
import OrderEditTable from "./order-edit-table";
import { useForm, SubmitHandler } from "react-hook-form";
import { Order } from "@/types/index";
import { useParams } from "next/navigation";
import { useGetOrderById } from "@/hooks/useGetOrderById";

type Inputs = Order;

const OrderEditArea = () => {
  const params = useParams();
  const { order } = useGetOrderById({ id: Number(params.id) });
  const methods = useForm<Inputs>({
    defaultValues: order,
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <OrderEditHeader methods={methods} />
      <OrderEditTable methods={methods} />
    </form>
  );
};

export default OrderEditArea;
