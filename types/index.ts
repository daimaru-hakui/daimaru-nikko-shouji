import { suppliers } from "@prisma/client";

export type OrderInputs = {
  contents: {
    supplierId: string;
    supplierName: string;
    productNumber: string;
    productName: string;
    color: string;
    size: string;
    quantity: string;
    processing: boolean;
    comment: string;
  }[];
};

export type Carts = {
  shippingAddress: number;
  orderNumber: string;
  topicName: string;
  contents: {
    supplierId: string;
    supplierName: string;
    productNumber: string;
    productName: string;
    color: string;
    size: string;
    quantity: string;
    processing: boolean;
    comment: string;
  }[];
};

export type ShippingScheduleInputs = {
  shippingDate: string;
  contents: {
    order_detail_id: number;
    quantity: number;
    remainingQuantity: number;
    shippingAddress: number;
    comment: string;
  }[];
};

export type ShippingAddress = {
  id: number;
  created_at: Date;
  updated_at: Date | null;
  name: string;
  tel: string;
  address: string;
  post_code: string;
};

export type Supplier = {
  id: number;
  created_at: Date;
  name: string;
  code: string;
  turn: number;
};

export type Order = {
  id: number;
  order_status: string;
  order_number: string;
  order_details: OrderDetail[];
  shipping_addresses: ShippingAddress
  created_at: Date;
  deleted_at: Date | null;
};

export type OrderDetail = {
  id: number;
  created_at: Date;
  order_history_id: bigint;
  product_number: string;
  product_name: string;
  color: string;
  size: string;
  quantity: number;
  comment: string;
  order_quantity: number;
  supplier_id: bigint;
  processing: boolean;
  suppliers:Supplier;
};
