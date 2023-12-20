import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Order } from "../types";
import { useRouter } from "next/navigation";

type Params = Order;
export const useMutationOrder = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const fetcher = async (params: Params) => {
    let url = "/api/orders";
    url += `/${params.id}`;
    const res = await axios.patch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      body: params,
    });
    const data = await res.data;
    return data;
  };

  const usePatchOrder = useMutation({
    mutationFn: (params: Params) => fetcher(params),
    // onMutate: async (params: Order) => {
    //   await queryClient.cancelQueries({ queryKey: ["orders"] });
    //   const previosOrders: Order[] | unknown = queryClient.getQueryData([
    //     "orders",
    //   ]);
    //   console.log("paramsId", params.id);
    //   queryClient.setQueryData(["orders", params.id], (old: Order[]) => [
    //     ...old,
    //     params,
    //   ]);
    //   return previosOrders;
    // },
    // onError: (error, params, context: any) => {
    //   console.log("error");
    //   queryClient.setQueryData(["orders",params.id], context.previosOrders);
    // },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      router.refresh();
    },
  });

  return {
    usePatchOrder,
  };
};
