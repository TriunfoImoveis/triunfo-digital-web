import { useFetch } from './useFetch';

interface filtersData {
  city: string;
  status: string;
  name: string;
}

export function useFindSaleByCityAndStatus<Data = any, Error = any>(
  url: string,
) {
  const { data, error } = useFetch<Data, Error>(url);

  return { data, error };
}
