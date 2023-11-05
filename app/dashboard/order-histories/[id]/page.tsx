import React from 'react';
import OrderHistoryHeader from './components/order-history-header';
import OrderHistoryTable from './components/order-history-table';

const OrderHistoryEditPage = () => {
  return (
    <div className="w-full max-w-[calc(1300px)] mx-auto">
      <h1 className="mt-6 text-3xl font-bold">発注処理</h1>
      <OrderHistoryHeader />
      <OrderHistoryTable />
    </div>
  );
};

export default OrderHistoryEditPage;