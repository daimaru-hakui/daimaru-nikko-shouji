import { create } from "zustand";


type Store = {
  currentUser: any | null;
  setCurrentUser: (currentUser: any) => void;
  session: any | null;
  setSession: (session: any) => void;
  isSidebar: boolean;
  toggleSidebar: () => void;
  isLoading: boolean;
  setIsLoading: (bool: boolean) => void;
  carts: Carts;
  setCartContents: (orderInputs: OrderInputs) => void;
  setCartOthers: (other: {
    name: string;
    value: boolean | string | number;
  }) => void;
  resetCarts: () => void;
  checkedOrders: any[];
  setCheckedOrders: (checkedOrders: any[]) => void;
  removeCheckedOrders: (checkedOrder: any) => void;
  resetCheckedOrders: () => void;
  productNumbers: string[];
  productNames: string[];
  productColors: string[];
  setProducts: (products: any[]) => void;
  suppliers: any[];
  setSuppliers: (suppliers: any[]) => void;
};

export const useStore = create<Store>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
  session: null,
  setSession: (session) => set(() => ({ session: session })),
  isLoading: false,
  setIsLoading: (bool) => set({ isLoading: bool }),
  isSidebar: true,
  toggleSidebar: () => set((state) => ({ isSidebar: !state.isSidebar })),
  carts: {
    shippingAddress: 1,
    orderNumber: "",
    topicName: "",
    contents: [],
  },
  setCartContents: (orderInputs) =>
    set((state) => {
      const array = { ...state.carts, ...orderInputs };
      return { carts: array };
    }),
  setCartOthers: (other) =>
    set((state) => {
      const array = { ...state.carts, [other.name]: other.value };
      return { carts: array };
    }),
  resetCarts: () =>
    set({
      carts: {
        shippingAddress: 0,
        orderNumber: "",
        topicName: "",
        contents: [],
      },
    }),
  checkedOrders: [],
  setCheckedOrders: (checkedOrders) =>
    set((state) => {
      const array = [...state.checkedOrders, ...checkedOrders];
      return {
        checkedOrders: array,
      };
    }),

  removeCheckedOrders: (checkedOrder) =>
    set((state) => {
      const array = state.checkedOrders.filter(
        (order) => order.id !== checkedOrder.id
      );
      return {
        checkedOrders: array,
      };
    }),
  resetCheckedOrders: () => set({ checkedOrders: [] }),
  productNumbers: [],
  productNames: [],
  productColors: [],
  setProducts: (products) =>
    set(() => {
      const productNumbers = products.map((product) => product.product_number);
      const setProductNumbers = new Set(productNumbers);
      const newProductNumbers = Array.from(setProductNumbers).sort();
      const productNames = products.map((product) => product.product_name);
      const setProducNames = new Set(productNames);
      const newProducNames = Array.from(setProducNames).sort();
      const productColors = products.map((product) => product.color);
      const setProductColors = new Set(productColors);
      const newProductColors = Array.from(setProductColors).sort();
      return {
        productNumbers: newProductNumbers,
        productNames: newProducNames,
        productColors: newProductColors,
      };
    }),
  suppliers: [],
  setSuppliers: (suppliers) => set({ suppliers }),
}));
