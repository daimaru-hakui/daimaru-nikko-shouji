import React from 'react';
import { NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { options } from '@/providers/options';
import ShippingScheduleTable from './components/shipping-schedules-table';

const ShippingSchedules: NextPage = async () => {


  const getUserId = async () => {
    const session = await getServerSession(options);
    return session?.user.uid;
  };

  const userId = await getUserId();

  if (!userId) return;

  return (
    <div className="w-full max-w-[calc(1500px)] mx-auto">
      <h1 className="mt-6 text-3xl font-bold">出荷予定（発注残）</h1>
      {/* <ShippingScheduleConfirmModal /> */}
      <ShippingScheduleTable userId={userId} />
    </div>
  );
};

export default ShippingSchedules;