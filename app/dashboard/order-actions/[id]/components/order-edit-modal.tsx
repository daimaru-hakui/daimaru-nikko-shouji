"use client";
import React, { FC } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";
import { format } from "date-fns";
import OrderEditModalTableRow from "./order-edit-modal-table-row";
import { useStore } from "@/store/index";
import { Order, OrderContent } from "@/types/index";
import { zeroPadding } from "@/utils/functions";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetShippingAddressAll } from "@/hooks/useGetShippingAddressAll";
import OrderEditModalTableHead from "./order-edit-modal-table-head";
import { useMutationShippingHistory } from "@/hooks/useMutationShippingHistory";
import { useMutationOrderDetail } from "@/hooks/useMutationOrderDetail";

interface Props {
  order: Order;
}

type Inputs = {
  shippingAddressId: string;
  contents: OrderContent[];
};

const OrderEditModal: FC<Props> = ({ order }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const checkedOrders = useStore((state) => state.checkedOrders);
  const resetCheckedOrders = useStore((state) => state.resetCheckedOrders);
  const { shippingAddresses } = useGetShippingAddressAll();
  const { usePatchOrderDetail } = useMutationOrderDetail();
  const contents = order.order_details.map((detail) => ({
    id: detail.id,
    supplierId: detail.supplier_id,
    productNumber: detail.product_number,
    productName: detail.product_name,
    color: detail.color,
    size: detail.size,
    orderQuantity: detail.order_quantity,
    price: detail.price,
    quantity: detail.quantity,
    processing: detail.processing,
    comment: detail.comment,
  }));
  const methods = useForm<Inputs>({
    defaultValues: {
      contents: [...contents],
    },
  });
  const { register, handleSubmit, reset } = methods;
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { mutate } = usePatchOrderDetail;
    mutate(data?.contents);
    resetCheckedOrders();
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
        編集
      </Button>
      <Dialog
        open={open}
        handler={() => {
          handleOpen();
          reset();
        }}
        size="xl"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="flex justify-between">
            <div className="flex gap-3 items-center">
              <div>編集</div>
            </div>
            <button>
              <AiOutlineClose onClick={() => setOpen(false)} />
            </button>
          </DialogHeader>
          <DialogBody className="pt-0">
            <div className="flex gap-6">
              <div>
                <div className="text-sm">受付番号</div>
                <div className="text-black">{zeroPadding(order.id)}</div>
              </div>
              <div>
                <div className="text-sm">貴社発注ナンバー</div>
                <div className="text-black">{order.order_number}</div>
              </div>
            </div>

            <div className="mt-3 flex gap-6">
              <div>
                <div className="text-sm">送り先</div>
                <div className="text-black">
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

            <div className="mt-6 min-h-[calc(40vh)] overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <OrderEditModalTableHead />
                </thead>
                <tbody>
                  {checkedOrders?.map((detail, idx) => (
                    <OrderEditModalTableRow
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
              <Button type="submit">更新</Button>
            </div>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default OrderEditModal;
