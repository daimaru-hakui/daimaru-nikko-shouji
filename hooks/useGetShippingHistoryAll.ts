import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {  ShippingDetailHistory } from '../types';

const fetcher = async () => {
  let url = "/api/shipping-histories";
  const res = await axios.get(url);
  const data = res.data;
  return data;
};

export const useGetShippingHistoryAll = () => {
  const QUERY_KEY = ['shipping-histories'];
  const queryResult = useQuery<ShippingDetailHistory[], Error>({ queryKey: QUERY_KEY, queryFn: () => fetcher() });

  return {
    "shippingHistories": queryResult.data ?? [],
    ...queryResult          
  }
};
