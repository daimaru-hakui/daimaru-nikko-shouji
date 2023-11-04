import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ShippingAddress } from '../types';

type Params = {
  id: number;
};

const fetcher = async (params: Params) => {
  let url = "/api/shipping-addresses";
  url += `/${params.id}`;
  const res = await axios.get(url);
  const data  = res.data;
  return data;
};

export const useGetShippingAddressById = (params: Params) => {
  const QUERY_KEY = ['shipping-address', params.id];
  const queryResult = useQuery<ShippingAddress, Error>({ queryKey: QUERY_KEY, queryFn: () => fetcher(params) });

  return {
    shippingAddress: queryResult.data,
    ...queryResult
  };
};
