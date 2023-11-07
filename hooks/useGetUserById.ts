import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../types";

interface Params {
  id: string;
}

const fetcher = async (params: Params) => {
  let url = "/api/users";
  url += `/${params.id}`;
  const res = await axios.get(url);
  const data = await res.data;
  return data;
};

export const useGetUserById = (params: Params) => {
  const QUERY_KEY = ["users", params.id];
  const queryResult = useQuery<any|Error>({
    queryKey: QUERY_KEY,
    queryFn: () => fetcher(params),
  });
  return {
    user: queryResult.data,
    ...queryResult,
  };
};
