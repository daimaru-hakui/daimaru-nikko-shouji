"use client";
import React, { FC } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";
import { format } from "date-fns";
import OrderHistoryModalTableRow from "./order-history-modal-table-row";
import { useStore } from "@/store/index";
import { Order } from "@/types/index";
import { zeroPadding } from "@/utils/functions";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetSupplierAll } from "@/hooks/useGetSupplierAll";
import { useGetShippingAddressAll } from "@/hooks/useGetShippingAddressAll";
import OrderHistoryModalTableHead from "./order-history-modal-table-head";
import { useMutationShippingHistory } from "@/hooks/useMutationShippingHistory";

interface Props {
  order: Order;
}

type Inputs = {
  shippingDate: string;
  shippingAddressId: string;
  contents: {
    orderDetailId: number;
    quantity: number;
    remainingQuantity: number;
  }[];
};

const OrderHistoryModal: FC<Props> = ({ order }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const checkedOrders = useStore((state) => state.checkedOrders);
  const { shippingAddresses } = useGetShippingAddressAll();
  const { usePatchShippingHistory } = useMutationShippingHistory();
  const methods = useForm<Inputs>();
  const { register, handleSubmit, reset } = methods;
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { mutate } = usePatchShippingHistory;
    console.log(data);
    mutate(data);
  };

  const inputStyle = "m-0.5 p-2";

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="gradient"
        className="py-2 px-4"
        size="sm"
      >
        発注処理
      </Button>
      <Dialog open={open} handler={handleOpen} size="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="flex justify-between">
            <div className="flex gap-3 items-center">
              <div>発注処理</div>
            </div>
            <button>
              <AiOutlineClose onClick={() => setOpen(false)} />
            </button>
          </DialogHeader>
          <DialogBody className="pt-0 ">
            <div className="flex gap-6">
              <div>
                <div className="text-sm">受付番号</div>
                <div className="ml-4 text-black">{zeroPadding(order.id)}</div>
              </div>
              <div>
                <div className="text-sm">貴社発注ナンバー</div>
                <div className="ml-4 text-black">{order.order_number}</div>
              </div>
            </div>
            <div className="mt-6 flex gap-6">
              <div>
                <div className="text-sm">出荷日</div>
                <div className="ml-4 text-black">
                  <input
                    type="date"
                    defaultValue={currentDate}
                    className={`${inputStyle}`}
                    {...register("shippingDate")}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-6">
              <div>
                <div className="text-sm">送り先</div>
                <div className="ml-4 text-black">
                  <select
                    className={`${inputStyle}`}
                    defaultValue={order.shipping_address_id}
                    {...register("shippingAddressId")}
                  >
                    <option value="">選択してください</option>
                    {shippingAddresses?.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 h-[calc(100%)] overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <OrderHistoryModalTableHead />
                </thead>
                <tbody>
                  {checkedOrders?.map((detail, idx) => (
                    <OrderHistoryModalTableRow
                      key={detail.id}
                      detail={detail}
                      methods={methods}
                      idx={idx}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </DialogBody>
          <DialogFooter>
            <div className="flex gap-3">
              <Button
                variant="text"
                onClick={() => {
                  handleOpen();
                  reset();
                }}
              >
                <span>閉じる</span>
              </Button>
              <Button type="submit">確定</Button>
            </div>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default OrderHistoryModal;
