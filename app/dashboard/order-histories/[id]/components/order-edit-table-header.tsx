import React from "react";

const OrderEditTableHeader = () => {
  const StyleTableTh = "";
  return (
    <tr>
      <th className={`${StyleTableTh}`}>メーカー</th>
      <th className={`${StyleTableTh}`}>品番</th>
      <th className={`${StyleTableTh}`}>品名</th>
      <th className={`${StyleTableTh}`}>カラー</th>
      <th className={`${StyleTableTh}`}>サイズ</th>
      <th className={`${StyleTableTh}`}>価格</th>
      <th className={`${StyleTableTh}`}>発注数</th>
      <th className={`${StyleTableTh}`}>残数</th>
      <th className={`${StyleTableTh}`}>出荷数</th>
      <th className={`${StyleTableTh}`}>二次加工</th>
      <th className={`${StyleTableTh}`}>コメント</th>
      <th className={`${StyleTableTh}`}>状態</th>
    </tr>
  );
};

export default OrderEditTableHeader;
