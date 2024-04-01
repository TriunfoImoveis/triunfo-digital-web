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
  sort?: 'ASC' | 'DESC';
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

interface Builder {
  id: string;
  name: string;
}

interface Client {
  id: string;
  name: string;
}
interface Sale {
  id: string;
  sale_has_sellers: User[];
  realty: Realty;
  realty_ammount: string;
  subsidiary: Subsidiary 
  sale_type: 'NOVO' | 'USADO';
  builder: Builder | null;
  client_buyer: Client;
}

interface BankData {
  id: string;
  account: string;
}

interface Participantes {
  user?: string;
  participant_type: string;
  comission_percentage: string;
  comission_integral: string;
  tax_percentage?: number;
  tax_value?: string;
  comission_liquid: string;
}

interface Division {
  division_type: {
    id: string;
  };
  percentage: string;
  value: string;
}

interface Calculation {
  pay_date: string;
  tax_rate_nf: string;
  note_value: string;
  bank_data: BankData
  participants: Participantes[];
  divisions: Division[];
}

export interface Installment {
  id: string;
  installment_number: number;
  due_date: string;
  pay_date: string;
  status: string;
  value: string;
  sale: Sale;
  calculation: Calculation
}

export interface ResponseInstallments {
  amountInstallmentPay: number;
  amountInstallmentRecived: number;
  totalInstallments: number;
  installments: Installment[];
}
export async function getInstallments(params: getInstallmentsParams){
  const response = await api.get<ResponseInstallments>('/installment', {
    params
  }); 

  return response.data
}