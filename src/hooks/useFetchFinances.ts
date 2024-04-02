import useSWR, { ConfigInterface } from 'swr';
import {AxiosResponse} from 'axios';
import api from '../services/api';

interface FechProps {
  url: string;
  params?: Object;
  config?: ConfigInterface;
}

export function useFetchFinances<Data = any, Error = any>({url, params, config}: FechProps) {
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
   [url, params],
    {
      ...config,
      fetcher: fecther
    },
  );

  return { data, error };
}
