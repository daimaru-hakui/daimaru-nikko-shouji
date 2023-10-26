import { useStore } from '@/store/index';
import { Button } from '@material-tailwind/react';
import React, { FC } from 'react';

interface Props {
  address: any;
  handleOpen: () => void;
}

const OrderShippingAddressTableRow: FC<Props> = ({ address, handleOpen }) => {
  const setCartOthers = useStore((state) => state.setCartOthers);
  const handleClickShippingAddress = (id: number) => {
    setCartOthers({ name: "shippingAddress", value: id });
    handleOpen();
  };
  const StyleTableTd = "p-4 text-left text-black border-b";
  return (
    <tr>
      <td className={`${StyleTableTd}`}>
        <Button
          onClick={() => handleClickShippingAddress(address.id)}>
          選択
        </Button>
      </td>
      <td className={`${StyleTableTd}`}>{address.name}</td>
      <td className={`${StyleTableTd}`}>{address.post_code}
        <span className='ml-3'>{address.address}</span></td>
      <td className={`${StyleTableTd}`}>{address.tel}</td>
    </tr>
  );
};

export default OrderShippingAddressTableRow;