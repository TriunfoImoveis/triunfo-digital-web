import { useFetch } from './useFetch';

interface filtersData {
  city: string;
  user?: string;
  type?: string;
}

export function useFindRealtor<Data = any, Error = any>({
  city,
  user = 'Corretor',
}: filtersData) {
  const currentYear = new Date().getFullYear();
  const url = `/ranking?city=${city}&user=${user}&year=${currentYear}`;
  const { data, error } = useFetch<Data, Error>(url);
  return { data, error };
}
