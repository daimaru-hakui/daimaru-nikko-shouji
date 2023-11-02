import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Order } from "../types";

const fetcher = async () => {
  let url = "/api/orders";
  const res = await axios.get(url);
  const data = await res.data;
  if(!data) return
  return data;
};

export const useGetOrderAll = () => {
  const QUERY_KEY = "orders";
  const queryResult = useQuery<Order[], Error>({
    queryKey: [QUERY_KEY],
    queryFn: () => fetcher(),
  });

  return {
    orders: queryResult.data ?? [],
    ...queryResult,
  };
};
