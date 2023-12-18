import { suppliers } from "@prisma/client";

export type User = {
  id: string;
  email: string;
  username: string | null;
  role: "ADMIN" | "USER" | "MEMBER" | null;
  created_at: Date;
};

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
  order_status: "UNREAD" | "READ" | "ARRANGE" | "CANCEL" | "SHIPPING";
  order_number: string;
  topic_name: string;
  order_details: OrderDetail[];
  shipping_address_id: number;
  shipping_addresses: ShippingAddress;
  created_at: Date;
  deleted_at: Date | null;
};

export type CreateOrder = {
  id: number;
  created_at: Date;
  order_number: string;
  topic_name: string;
  order_status: string;
  deleted_at: Date | null;
  shipping_address_id: number;
};

export type OrderDetail = {
  id: number;
  created_at: Date;
  order_id: number;
  product_number: string;
  product_name: string;
  color: string;
  size: string;
  quantity: number;
  comment: string;
  order_quantity: number;
  price: number;
  supplier_id: number;
  processing: boolean;
  suppliers: Supplier;
};

export type OrderContent = {
  id: number;
  supplierId: number;
  productNumber: string;
  productName: string;
  color: string;
  size: string;
  orderQuantity: number;
  price: number;
  quantity: number;
  remainingQuantity: number;
  processing: boolean;
  comment: string;
};

export type ShippingSchedule = {
  id: number;
  created_at: Date;
  product_number: string;
  product_name: string;
  color: string;
  size: string;
  quantity: number;
  comment: string;
  order_quantity: number;
  processing: boolean;
  order_id: number;
  orders: Order;
  supplier_id: number;
  suppliers: Supplier;
};

export type ShippingInputs = {
  shippingDate: string;
  orderId: number;
  shippingAddressId: string;
  contents: {
    orderDetailId: number;
    quantity: number;
    remainingQuantity: number;
  }[];
};

export type ShippingHistory = {
  id: number;
  shipping_date: Date;
  shipping_address_id: number;
  shipping_addresses: ShippingAddress;
  shipping_details: ShippingDetail[];
  order_id: number;
  orders: Order;
  created_at: Date;
};

export type ShippingDetail = {
  id: number;
  order_detail_id: number;
  shipping_date: Date;
  quantity: number;
  created_at: Date;
};

export type ShippingDetailHistory = {
  id: number;
  order_detail_id: number;
  order_details: OrderDetail;
  shipping_history_id: number;
  shipping_histories: ShippingHistory;
  quantity: number;
  created_at: Date;
};
