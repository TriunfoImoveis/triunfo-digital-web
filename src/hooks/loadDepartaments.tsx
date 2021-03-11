import { useFetch } from './useFetch';

interface filtersData {
  subsidiary: string;
}

export function useLoadDepartament<Data = any, Error = any>({
  subsidiary,
}: filtersData) {
  const url = `/departament?subsidiary=${subsidiary}`;
  const { data, error } = useFetch<Data, Error>(url);
  return { data, error };
}
