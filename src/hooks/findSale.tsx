import useSWR from 'swr';
import api from '../services/api';

interface filtersData {
  city: string;
  status: string;
  name?: string;
}

export function useFindSaleByCityAndStatus<Data = any, Error = any>({
  city,
  status,
}: filtersData) {
  const url = `/sale?city=${city}&status=${status}`;
  const { data, error } = useSWR<Data, Error>(url, async url => {
    const response = await api.get(url);
    return response.data;
  });

  return { data, error };
}
