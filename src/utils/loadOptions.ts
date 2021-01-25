import banks from '../services/Data/banks';
import { filterOptions } from './filters';
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
