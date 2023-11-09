import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Order, ShippingInputs } from "../types";
import { useStore } from "../store";

type Params = ShippingInputs;
export const useMutationShippingHistory = () => {
  const queryClient = useQueryClient();
  const resetCheckedOrders = useStore((state) => state.resetCheckedOrders);

  const fetcher = async (params: Params) => {
    let url = "/api/shipping-histories";
    const res = await axios.post(url, {
      headers: {
        "Content-Type": "application/json",
      },
      body: params,
    });
    const data = await res.data;
    return data;
  };

  const usePostShippingHistory = useMutation({
    mutationFn: (params: Params) => fetcher(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      resetCheckedOrders();
    },
  });

  return {
    usePostShippingHistory,
  };
};
