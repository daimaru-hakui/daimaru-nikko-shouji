import React from "react";

const OrderHistoryModalTableHead = () => {
  const StyleTableTh = "bg-blue-gray-50";
  return (
    <tr>
      <th className={`${StyleTableTh}`}>メーカー</th>
      <th className={`${StyleTableTh}`}>品番</th>
      <th className={`${StyleTableTh}`}>品名</th>
      <th className={`${StyleTableTh}`}>カラー</th>
      <th className={`${StyleTableTh} text-center`}>サイズ</th>
      <th className={`${StyleTableTh} text-center`}>受注数</th>
      <th className={`${StyleTableTh} text-center`}>未出荷数</th>
      <th className={`${StyleTableTh} text-center`}>出荷数</th>
      <th className={`${StyleTableTh} text-center`}>残数</th>
      <th className={`${StyleTableTh} text-center`}>二次加工</th>
      <th className={`${StyleTableTh}`}>コメント</th>
    </tr>
  );
};

export default OrderHistoryModalTableHead;
