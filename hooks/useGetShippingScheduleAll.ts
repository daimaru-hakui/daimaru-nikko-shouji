import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ShippingSchedule } from '../types';

const fetcher = async () => {
  let url = "/api/shipping-schedules";
  const res = await axios.get(url);
  const data = res.data;
  return data;
};

export const useGetShippingScheduleAll = () => {
  const QUERY_KEY = ['shipping-schedules'];
  const queryResult = useQuery<ShippingSchedule[], Error>({ queryKey: QUERY_KEY, queryFn: () => fetcher() });

  return {
    "shippingSchedules": queryResult.data ?? [],
    ...queryResult
  };
};
