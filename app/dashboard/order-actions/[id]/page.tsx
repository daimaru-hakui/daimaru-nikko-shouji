import React from 'react';
import OrderActionHeader from './components/order-action-header';
import OrderActionTable from './components/order-action-table';

const OrderHistoryEditPage = () => {
  return (
    <div className="w-full max-w-[calc(1100px)] mx-auto">
      <h1 className="mt-6 text-3xl font-bold">発注処理</h1>
      <OrderActionHeader />
      <OrderActionTable />
    </div>
  );
};

export default OrderHistoryEditPage;