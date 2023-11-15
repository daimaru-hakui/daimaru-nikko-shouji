import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Order } from "../types";

type Params = Order;
export const useMutationOrder = () => {
  const queryClient = useQueryClient();

  const fetcher = async (params: Params) => {
    let url = "/api/orders/";
    url += `/${params.id}`;
    const res = await axios.patch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: params
    });
    const data = await res.data;
    return data;
  };

  const usePatchOrderStatusSelect = useMutation({
    mutationFn: (params: Params) => fetcher(params),
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

  return {
    usePatchOrderStatusSelect
  };

};