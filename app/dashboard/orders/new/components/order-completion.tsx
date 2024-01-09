import React, { FC } from "react";

import { FaCheck } from "react-icons/fa";

type Props = {
  createOrderId: number | null;
};

const OrderCompletion: FC<Props> = ({ createOrderId }) => {
  return (
    <div className="mt-20 flex flex-col items-center">
      <FaCheck style={{ fontSize: "56px", fontWeight: "bold" }} />
      <div className="mt-6">
        ご注文ありがとうございました。またのご利用をお待ちしております。
      </div>
      <div className="mt-6 flex">
        <div className="font-bold">受付番号</div>
        <div className="ml-6">{createOrderId}</div>
      </div>
    </div>
  );
};

export default OrderCompletion;
