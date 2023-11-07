import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Order } from "../types";

type Params = any;
export const useMutationShippingHistory = () => {
  const queryClient = useQueryClient();

  const fetcher = async (params: Params) => {
    let url = "/api/shipping-histories/";
    const res = await axios.patch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: params
    });
    const data = await res.data;
    return data;
  };

  const usePatchShippingHistory = useMutation({
    mutationFn: (params: Params) => fetcher(params),
   onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['shipping-histories'] });
  },
  });

  return {
    usePatchShippingHistory
  };

};