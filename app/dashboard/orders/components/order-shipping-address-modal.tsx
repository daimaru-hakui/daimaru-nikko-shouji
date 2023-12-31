import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import OrderShippingAddressTableRow from "./order-shipping-address-table-row";
import { AiOutlineClose } from "react-icons/ai";
import { useGetShippingAddressAll } from "@/hooks/useGetShippingAddressAll";

const OrderShippingAddressModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const { shippingAddresses } = useGetShippingAddressAll();

  const StyleTableTh =
    "border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-left";

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        選択
      </Button>
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader className="flex justify-between">
          お届け先を選択
          <button>
            <AiOutlineClose onClick={handleOpen} />
          </button>
        </DialogHeader>
        <DialogBody className="h-[30rem] overflow-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className={`${StyleTableTh}`}></th>
                <th className={`${StyleTableTh}`}>お届け先</th>
                <th className={`${StyleTableTh}`}>住所</th>
                <th className={`${StyleTableTh}`}>電話番号</th>
              </tr>
            </thead>
            <tbody>
              {shippingAddresses?.map((address) => (
                <OrderShippingAddressTableRow
                  key={address.id}
                  address={address}
                  handleOpen={handleOpen}
                />
              ))}
            </tbody>
          </table>
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

export default OrderShippingAddressModal;
