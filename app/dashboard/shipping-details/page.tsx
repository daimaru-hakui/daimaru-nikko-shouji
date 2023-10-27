import React from "react";
import { cookies } from "next/headers";
import { NextPage } from "next";

const ShippingDetails: NextPage = async () => {

//   const getShippingDetails = async () => {
//     // const { data, error } = await supabase
//     //   .from("shipping_details")
//     //   .select(
//     //     "*,shipping_histories(*,shipping_addresses(*)),order_details(*,order_histories(*))"
//     //   )
//     //   .order("created_at", { ascending: false });
//     // if (error) {
//     //   console.log(error.message);
//     // }
//     // return data;
//   };

//   const shippingDetails = await getShippingDetails();
//   if (!shippingDetails) return;

  return (
    <div className="w-full max-w-[calc(1200px)] mx-auto">
      <h1 className="mt-6 text-3xl font-bold">出荷履歴</h1>
      {/* <ShippingDetailTable shippingDetails={shippingDetails} /> */}
    </div>
  );
};

export default ShippingDetails;