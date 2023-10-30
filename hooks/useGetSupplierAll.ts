import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {  Supplier } from '../types';

const fetcher = async () => {
  let url = "/api/suppliers";
  const res = await axios.get(url);
  const { data }= res.data;
  return data;
};

export const useGetSupplierAll = () => {
  const QUERY_KEY = ['suppliers'];
  return useQuery<Supplier[], Error>({ queryKey: QUERY_KEY, queryFn: () => fetcher() });
};
