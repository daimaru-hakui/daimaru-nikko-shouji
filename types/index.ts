import { suppliers } from "@prisma/client";

export type User = {
  id: string;
  email: string;
  username: string | null;
  role: "ADMIN" | "USER" | "MEMBER" | null;
  createdAt: Date;
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
    orderDetailId: number;
    quantity: number;
    remainingQuantity: number;
    shippingAddress: number;
    comment: string;
  }[];
};

export type ShippingAddress = {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  name: string;
  tel: string;
  address: string;
  postCode: string;
};

export type Supplier = {
  id: number;
  createdAt: Date;
  name: string;
  code: string;
  turn: number;
};

export type OrderStatus = "UNREAD" | "READ" | "ARRANGE" | "CANCEL" | "SHIPPING";

export type Order = {
  id: number;
  orderStatus: OrderStatus;
  orderNumber: string;
  topicName: string;
  orderDetails: OrderDetail[];
  shippingAddressId: number;
  shippingAddresses: ShippingAddress;
  createdAt: Date;
  deletedAt: Date | null;
  // contents: OrderDetail[];
};

export type CreateOrder = {
  id: number;
  createdAt: Date;
  orderNumber: string;
  topicName: string;
  orderStatus: OrderStatus;
  deletedAt: Date | null;
  shippingAddressId: number;
};

export type OrderDetail = {
  id: number;
  createdAt: Date;
  orderId: number;
  productNumber: string;
  productName: string;
  color: string;
  size: string;
  quantity: number;
  comment: string;
  orderQuantity: number;
  price: number;
  supplierId: number;
  processing: boolean;
  suppliers: Supplier;
  remainingQuantity: number;
};

export type OrderDetailInputs = {
  id: number;
  createdAt: Date;
  orderId: number;
  productNumber: string;
  productName: string;
  color: string;
  size: string;
  quantity: number;
  comment: string;
  orderQuantity: number;
  price: number;
  supplierId: number;
  processing: boolean;
  suppliers: Supplier;
  remainingQuantity: number;
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
  createdAt: Date;
  productNumber: string;
  productName: string;
  color: string;
  size: string;
  quantity: number;
  comment: string;
  orderQuantity: number;
  processing: boolean;
  orderId: number;
  orders: Order;
  supplierId: number;
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
  shippingDate: Date;
  shippingAddressId: number;
  shippingAddresses: ShippingAddress;
  shippingDetails: ShippingDetail[];
  orderId: number;
  orders: Order;
  createdAt: Date;
};

export type ShippingDetail = {
  id: number;
  orderDetailId: number;
  shipping_date: Date;
  quantity: number;
  createdAt: Date;
};

export type ShippingDetailHistory = {
  id: number;
  orderDetailId: number;
  orderDetails: OrderDetail;
  shippingHistoryId: number;
  shippingHistories: ShippingHistory;
  quantity: number;
  createdAt: Date;
};
