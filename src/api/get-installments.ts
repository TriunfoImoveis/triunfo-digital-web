import api from "../services/api";
export interface getInstallmentsParams {
  buyer_name?: string;
  subsidiary?: string;
  status?: string;
  month?: string;
  year?: string;
  dateFrom?: string;
  dateTo?: string;
  perPage?: number;
  page?: number;
}

interface Subsidiary {
  id: string;
  name: string;
}
interface Realty {
  enterprise: string;
}

interface User {
  id: string;
  name: string;
}
interface Sale {
  id: string;
  sale_has_sellers: User[];
  realty: Realty;
  realty_ammount: string;
  subsidiary: Subsidiary  
}

export interface Installment {
  id: string;
  installment_number: number;
  due_date: string;
  status: string;
  value: string;
  sale: Sale;
}

export interface ResponseInstallments {
  amountInstallmentPay: number;
  amountInstallmentRecived: number;
  totalInstallments: number;
  installments: Installment[];
}
export async function getInstallments(params: getInstallmentsParams){
  console.log({params})
  const response = await api.get<ResponseInstallments>('/installment', {
    params
  }); 

  return response.data
}