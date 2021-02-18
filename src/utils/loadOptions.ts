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
  { label: 'CONTA SÁLARIO', value: 'SALARIO' },
];

export const loadOptionsTypeAccount = (inputValue: string, callback: any) => {
  setTimeout(() => {
    callback(filterOptions(inputValue, OptionsTypeAccount));
  }, 1000);
};

// CIDADES
const optionsStates: OptionsData[] = [
  { label: 'Maranhão', value: 'MA' },
  { label: 'Ceará', value: 'CE' },
  { label: 'PI', value: 'MA' },
];
export const loadStates = async (inputValue: string, callback: any) => {
  setTimeout(() => {
    callback(filterOptions(inputValue, optionsStates));
  }, 1000);
};

// Genero

export const optionsGenero: OptionsData[] = [
  { label: 'Masculino', value: 'MASCULINO' },
  { label: 'Femenino', value: 'FEMENINO' },
  { label: 'Outros', value: 'OUTROS' },
];

// Estado Civíl
export const optionsCivilStatus: OptionsData[] = [
  { label: 'Casado(a)', value: 'CASADO(A)' },
  { label: 'Solteiro(a)', value: 'SOLTEIRO(A)' },
  { label: 'Divorciado(a)', value: 'DIVORCIADO(A)' },
  { label: 'Viúvo(a)', value: 'VIUVO(A)' },
];

export const optionsBonus = [
  { id: '1', label: 'Sim', value: 'Y' },
  { id: '2', label: 'Não', value: 'N' },
];
