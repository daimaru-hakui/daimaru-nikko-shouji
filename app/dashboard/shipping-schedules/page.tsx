import React from 'react';
import { NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { options } from '@/provider/options';

const ShippingSchedules: NextPage = async () => {
//   const getShippingSchedules = async () => {
//     const { data, error } = await supabase
//       .from("order_details")
//       .select(`*,order_histories(*,shipping_addresses(*)),suppliers(*)`)
//       .gt("quantity", 0)
//       .order("id", { ascending: false });
//     if (error) {
//       alert(error.message);
//     }
//     if (!data) return;
//     return data;
//   };

  const getUserId = async () => {
    const session = await getServerSession(options)
    return session?.user.uid
  };

//   const shippingSchedules = await getShippingSchedules();
  const userId = await getUserId();

//   if (!shippingSchedules) return;
  if (!userId) return;

  return (
    <div className="w-full max-w-[calc(1500px)] mx-auto">
      <h1 className="mt-6 text-3xl font-bold">出荷予定（発注残）</h1>
      {/* <ShippingScheduleConfirmModal />
      <ShippingScheduleTable shippingSchedules={shippingSchedules} userId={userId} /> */}
    </div>
  );
};

export default ShippingSchedules;