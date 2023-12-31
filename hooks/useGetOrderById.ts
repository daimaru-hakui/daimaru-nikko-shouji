import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Order } from "../types";

type Params = {
  id: number;
};

const fetcher = async (params: Params) => {
  let url = "/api/orders";
  url += `/${params.id}`;
  const res = await axios.get(url);
  const data = res.data;
  return data;
};

export const useGetOrderById = (params: Params) => {
  const QUERY_KEY = [`orders`, params.id];
  const  queryResult = useQuery<Order,Error>({
    queryKey: QUERY_KEY,
    queryFn: () => fetcher(params),
  });
  return {
    order: queryResult.data,
    ...queryResult
  }
};
