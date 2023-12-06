import React, { FC } from "react";

import { FaCheck } from "react-icons/fa";

type Props = {
  createOrderId: number | null;
};

const OrderCompletion: FC<Props> = ({ createOrderId }) => {
  return (
    <div className="mt-20 flex flex-col items-center">
      <FaCheck style={{ fontSize: "56px", fontWeight: "bold" }} />
      <div className="mt-6 font-bold">受付番号: {createOrderId}</div>
      <div className="mt-6 font-bold">ご注文ありがとうございました。</div>
      <p></p>
    </div>
  );
};

export default OrderCompletion;
