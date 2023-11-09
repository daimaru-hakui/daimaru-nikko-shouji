import { useQuery } from "@tanstack/react-query";
import { ShippingDetail } from "../types";
import axios from "axios";

const fetcher = async () => {
  let url = "/api/shipping-details";
  const res = await axios.get(url);
  const data = res.data;
  return data;
};

export const useGetShippingDetailAll = () => {
  const QUERY_KEY = ["shipping-details"];
  const queryResult = useQuery<ShippingDetail[], Error>({
    queryKey: QUERY_KEY,
    queryFn: () => fetcher(),
  });

  return {
    shippingDetails: queryResult.data,
    ...queryResult,
  };
};
