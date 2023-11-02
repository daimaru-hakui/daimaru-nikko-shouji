import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Supplier } from "../types";

const fetcher = async () => {
  let url = "/api/suppliers";
  const res = await axios.get(url);
  const data = await res.data;
  if (!data) return;
  return data;
};

export const useGetSupplierAll = () => {
  const QUERY_KEY = ["suppliers"];
  const queryResult =  useQuery<Supplier[], Error>({
    queryKey: QUERY_KEY,
    queryFn: () => fetcher(),
  });

  return {
    suppliers: queryResult.data ?? [],
    ...queryResult,
  };

};
