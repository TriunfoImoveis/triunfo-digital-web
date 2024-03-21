import { useFetch } from './useFetch';

interface filtersData {
  subsidiary: string;
  name: string;
}

export function useFindRealtor<Data = any, Error = any>({
  subsidiary,
  name
}: filtersData) {
  const url = '/users';
  const { data, error } = useFetch<Data, Error>(url, {
    subsidiary,
    name,
    office: 'Corretor'
  });
  return { data, error };
}
