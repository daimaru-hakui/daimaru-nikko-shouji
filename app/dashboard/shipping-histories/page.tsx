import React from "react";
import { cookies } from "next/headers";
import { NextPage } from "next";

const ShippingHistory: NextPage = async () => {
  // const getShippingHistories = async () => {
  //   const { data, error } = await supabase
  //     .from("shipping_histories")
  //     .select(
  //       "*,shipping_addresses(*),shipping_details(*,order_details(*,order_histories(*)))"
  //     )
  //     .order("created_at", { ascending: false });
  //   if (error) {
  //     console.log(error.message);
  //   }
  //   return data;
  // };
  // const shippingHistories = await getShippingHistories();
  // if (!shippingHistories) return;

  return (
    <div className="w-full max-w-[calc(1200px)] mx-auto">
      <h1 className="mt-6 text-3xl font-bold">出荷伝票</h1>
      {/* <ShippingHistoryTable shippingHistories={shippingHistories} /> */}
    </div>
  );
};

export default ShippingHistory;
