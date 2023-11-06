"use client";
import React, { FC } from "react";
import OrderShippingAddressModal from "./order-shipping-address-modal";
import { useStore } from "@/store/index";
import { useGetShippingAddressById } from "@/hooks/useGetShippingAddressById";

const OrderShipping: FC = () => {
  const carts = useStore((state) => state.carts);
  const shippingAddressId = carts.shippingAddress;
  const setCartOthers = useStore((state) => state.setCartOthers);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setCartOthers({ name, value: e.target.value });
  };

  const { shippingAddress } = useGetShippingAddressById({ id: shippingAddressId });
  console.log(shippingAddress);

  return (
    <div className="w-full max-w-[calc(1000px)] mx-auto">
      <div className="font-bold">お届け先/お届け方法</div>
      <div className="w-full mt-3 p-3 flex flex-col md:flex-row justify-between border border-gray-900/10">
        <div className="">
          <div>{shippingAddress?.name}</div>
          <div className="flex gap-3  w-full">
            <div>{shippingAddress?.post_code}</div>
            <div>{shippingAddress?.address}</div>
          </div>
          <div className="flex gap-3 w-full">
            <div>{shippingAddress?.tel && "TEL"}</div>
            <div>{shippingAddress?.tel}</div>
          </div>
        </div>
        <div className="mt-6">
          <OrderShippingAddressModal />
        </div>
      </div>

      <div className="w-full mt-12">
        <div className="font-bold">貴社注文番号</div>
        <input
          className={`mt-3 p-3 w-full max-w-[calc(500px)]`}
          name="orderNumber"
          value={carts.orderNumber}
          onChange={handleChangeInput}
        />
      </div>

      <div className="w-full mt-12">
        <div className="font-bold">案件名</div>
        <input
          className={`mt-3 p-3 w-full max-w-[calc(500px)]`}
          name="topicName"
          value={carts.topicName}
          onChange={handleChangeInput}
        />
      </div>

      {/* <div className='mt-12'>
        <div className='font-bold'>サンプル</div>
        <div className='mt-1'>
          <Checkbox
            label="サンプル"
            name="sample"
            checked={carts.sample}
            onChange={handleCheck}
            crossOrigin={undefined}
          />
        </div>
      </div> */}
    </div>
  );
};

export default OrderShipping;
