import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Order } from "../types";

type Params = Order;

const fetcher = async (params: Params) => {
  console.log(params);
  let url = "/api/orders/cancel";
  url += `/${params.id}`;
  const res = await axios.patch(url);
  return res;
};
export const usePatchOrderCancel = (params: Params) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => fetcher(params),
    onMutate: async (params: Order) => {
      await queryClient.cancelQueries({ queryKey: ["orders"] });
      const previosOrders: Order[] | unknown = queryClient.getQueryData(["orders"]);
      queryClient.setQueryData(["orders"], (old: Order[]) => {
        const newOrders = old.map((order) => {
          if (order.id === params.id) {
            return {
              ...params
            }
          } else {
            return {
              ...order
            }
          }
        })
        return newOrders
      });
      return previosOrders;
    },
    onError: (error, params, context:any) => {
      queryClient.setQueryData(["orders"], context.previosOrders);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};