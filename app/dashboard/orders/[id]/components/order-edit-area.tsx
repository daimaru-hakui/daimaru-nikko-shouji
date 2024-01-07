"use client";
import React, { FC } from "react";
import OrderEditHeader from "./order-edit-header";
import OrderEditTable from "./order-edit-table";
import { useForm, SubmitHandler } from "react-hook-form";
import { Order } from "@/types/index";
import { Button } from "@material-tailwind/react";
import { useMutationOrder } from "@/hooks/useMutationOrder";

type Inputs = Order;
type Props = {
  data: Order;
};

const OrderEditArea: FC<Props> = ({ data }) => {
  const { usePatchOrder } = useMutationOrder();
  const methods = useForm<Inputs>({
    defaultValues: data,
  });
  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { mutate } = usePatchOrder;
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <OrderEditHeader methods={methods} />
      <OrderEditTable methods={methods} />
    </form>
  );
};

export default OrderEditArea;
