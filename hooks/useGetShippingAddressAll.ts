import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ShippingAddress } from '../types';

const fetcher = async () => {
  let url = "/api/shipping-addresses";
  const res = await axios.get(url);
  const { data }= res.data;
  return data;
};

export const useGetShippingAddressAll = () => {
  const QUERY_KEY = ['shipping-address'];
  return useQuery<ShippingAddress[], Error>({ queryKey: QUERY_KEY, queryFn: () => fetcher() });
};
