import { useGetShippingAddressById } from '@/hooks/useGetShippingAddressById';
import { useStore } from '@/store/index';
import React, { FC } from 'react';

const OrderConfirm: FC = () => {
  const carts = useStore((state) => state.carts);
  const shippingAddressId = carts.shippingAddress;
  const { data: shippingAddress } = useGetShippingAddressById({ id: shippingAddressId });

  const StyleTableTh = "p-4";
  const StyleTableTd = "p-4";

  return (
    <>
      <div className='font-bold'>発注明細</div>
      <div className='mt-3 overflow-auto'>
        <table className="w-full min-w-[calc(1000px)] table-auto text-left">
          <thead>
            <tr className="text-left">
              <th className={`${StyleTableTh}`}>No.</th>
              <th className={`${StyleTableTh}`}>メーカー</th>
              <th className={`${StyleTableTh}`}>品番</th>
              <th className={`${StyleTableTh}`}>品名</th>
              <th className={`${StyleTableTh}`}>カラー</th>
              <th className={`${StyleTableTh}`}>サイズ</th>
              <th className={`${StyleTableTh}`}>数量</th>
              <th className={`${StyleTableTh}`}>備考</th>
            </tr>
          </thead>
          <tbody>
            {carts.contents.map((content, idx) => (
              <tr key={idx}>
                <td className={`${StyleTableTd}`}>{idx + 1}</td>
                <td className={`${StyleTableTd}`}>{content.supplierName}</td>
                <td className={`${StyleTableTd}`}>{content.productNumber}</td>
                <td className={`${StyleTableTd}`}>{content.productName}</td>
                <td className={`${StyleTableTd}`}>{content.color}</td>
                <td className={`${StyleTableTd}`}>{content.size}</td>
                <td className={`${StyleTableTd}`}>{content.quantity}</td>
                <td className={`${StyleTableTd}`}>{content.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='w-full'>
        <div className='mt-12 font-bold'>お届け先/お届け方法</div>
        <div className='mt-3 p-6 border border-gray-900/10'>
          <div className='w-full flex flex-col md:flex-row justify-between'>
            <div>
              <div>{shippingAddress?.name}</div>
              <div className='flex gap-3'>
                <div>{shippingAddress?.postCode}</div>
                <div>{shippingAddress?.address}</div>
              </div>
              <div className='flex gap-3'>
                <div>{shippingAddress?.tel && "TEL"}</div>
                <div>{shippingAddress?.tel}</div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-12 font-bold'>貴社注文番号</div>
        <div className='p-3'>
          {carts.orderNumber}
        </div>
        <div className='mt-12 font-bold'>案件名</div>
        <div className='p-3'>
          {carts.topicName}
        </div>
      </div>
    </>
  );
};

export default OrderConfirm;