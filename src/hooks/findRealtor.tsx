import { useFetch } from './useFetch';

interface filtersData {
  city: string;
  user?: string;
  type?: string;
}

export function useFindRealtor<Data = any, Error = any>({
  city,
  user = 'Corretor',
  type = 'ANUAL',
}: filtersData) {
  const url = `/ranking?city=${city}&user=${user}&type=${type}`;
  const { data, error } = useFetch<Data, Error>(url);
  return { data, error };
}
