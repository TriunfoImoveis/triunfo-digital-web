import { useFetch } from './useFetch';

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
  const { data, error } = useFetch<Data, Error>(url);

  return { data, error };
}
