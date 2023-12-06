import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { OrderContent } from "../types";

type Params = OrderContent[]

export const useMutationOrderDetail = () => {
  const queryClient = useQueryClient();
  const fetcher = async (params: Params) => {
    const url = "/api/order-details";
    const res = await axios.patch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      body: params,
    });
    const data = await res.data;
    return data;
  };

  const usePatchOrderDetail = useMutation({
    mutationFn: (params: Params) => fetcher(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
  return {
    usePatchOrderDetail,
  };
};
