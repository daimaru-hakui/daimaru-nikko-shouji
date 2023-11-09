import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {  ShippingHistory } from '../types';

const fetcher = async () => {
  let url = "/api/shipping-invoices";
  const res = await axios.get(url);
  const data = res.data;
  return data;
};

export const useGetShippingInvoiceyAll = () => {
  const QUERY_KEY = ['shipping-invoices'];
  const queryResult = useQuery<ShippingHistory[], Error>({ queryKey: QUERY_KEY, queryFn: () => fetcher() });

  return {
    "shippingInvoices": queryResult.data ?? [],
    ...queryResult          
  }
};
