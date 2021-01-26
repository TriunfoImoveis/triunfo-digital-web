import api from '../services/api';
import banks from '../services/Data/banks';
import { filterOptions } from './filters';

interface OptionsData {
  label: string;
  value: string;
}

// Bancos
const opionsBanks = banks.map(bank => ({
  label: `${bank.code} - ${bank.fullName}`,
  value: bank.fullName,
}));
export const loadOptionsBank = (inputValue: string, callback: any): void => {
  setTimeout(() => {
    callback(filterOptions(inputValue, opionsBanks));
  }, 1000);
};

// TIPO DE CONTA DE BANCO
const OptionsTypeAccount = [
  { label: 'POUPANÇA', value: 'POUPANÇA' },
  { label: 'CORRENTE', value: 'CORRENTE' },
];

export const loadOptionsTypeAccount = (inputValue: string, callback: any) => {
  setTimeout(() => {
    callback(filterOptions(inputValue, OptionsTypeAccount));
  }, 1000);
};

// TIPOS DE PROPRIEDADE
export const loadPropertyType = async (
  inputValue: string,
  callback: any,
  uf: string,
) => {
  const response = await api.get('/property-type');
  const optionsPropertyType: OptionsData[] = response.data.map(data => ({
    label: data.name,
    value: data.id,
  }));
  setTimeout(() => {
    callback(filterOptions(inputValue, optionsPropertyType));
  }, 1000);
};
