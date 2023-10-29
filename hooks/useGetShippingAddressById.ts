import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ShippingAddress } from '../types';

type Params = {
  shippingAddressId: number;
};

const fetcher = async (params: Params) => {
  let url = "/api/shipping-addresses";
  url += `/${params.shippingAddressId}`;
  const res = await axios.get(url);
  const { data }= res.data;
  return data;
};

export const useGetShippingAddressById = (params: Params) => {
  const QUERY_KEY = ['shipping-address',params.shippingAddressId];
  return useQuery<ShippingAddress, Error>({ queryKey: QUERY_KEY, queryFn: () => fetcher(params) });
};
