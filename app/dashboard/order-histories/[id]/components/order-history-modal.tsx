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
import OrderHistoryModalTableRow from "./order-history-modal-table-row";
import { useStore } from "@/store/index";
import { Order } from "@/types/index";
import { zeroPadding } from "@/utils/functions";

interface Props {
  order: Order;
}

const OrderHistoryModal: FC<Props> = ({ order }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const checkedOrders = useStore((state) => state.checkedOrders);

  const StyleTableTh =
    "bg-blue-gray-50";

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
              <div className="text-sm">発注日時</div>
              <div className="ml-4 text-black">
                {format(new Date(order.created_at), "yyyy年MM月dd日 HH時mm分")}
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-6">
            <div>
              <div className="text-sm">送り先</div>
              <div className="ml-4 text-black">
                {order.shipping_addresses?.name}
              </div>
            </div>
          </div>
          <div className="mt-6 h-[calc(100%)] overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className={`${StyleTableTh}`}>メーカー</th>
                  <th className={`${StyleTableTh}`}>品番</th>
                  <th className={`${StyleTableTh}`}>品名</th>
                  <th className={`${StyleTableTh}`}>カラー</th>
                  <th className={`${StyleTableTh} text-center`}>サイズ</th>
                  <th className={`${StyleTableTh} text-center`}>受注数</th>
                  <th className={`${StyleTableTh} text-center`}>未出荷数</th>
                  <th className={`${StyleTableTh} text-center`}>出荷数</th>
                  <th className={`${StyleTableTh} text-center`}>二次加工</th>
                  <th className={`${StyleTableTh}`}>コメント</th>
                </tr>
              </thead>
              <tbody>
                {checkedOrders?.map((detail) => (
                  <OrderHistoryModalTableRow key={detail.id} detail={detail} />
                ))}
              </tbody>
            </table>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpen} className="mr-1">
            <span>閉じる</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default OrderHistoryModal;