import useSWR from 'swr';
import {AxiosResponse} from 'axios';
import api from '../services/api';

export function useFetch<Data = any, Error = any>(url: string, parms?: Object) {
  const fecther = async (url: string, parms?: Object) => {
    let response: AxiosResponse<any>;
    if (parms !== undefined) {
      response = await api.get(url, {
        params: parms,
      });
    } else {
      response = await api.get(url);
    }
 
   
    return response.data;
  }
  const { data, error } = useSWR<Data, Error>(
   [url, parms],
    {
      revalidateOnFocus: true,
      refreshInterval: 10000,
      revalidateOnReconnect: true,
      fetcher: fecther
    },
  );

  return { data, error };
}
