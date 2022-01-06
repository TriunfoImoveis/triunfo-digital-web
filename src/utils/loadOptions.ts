import banks from '../services/Data/banks';
import { filterOptions } from './filters';

interface OptionsData {
  label: string;
  value: string;
}

// Bancos
export const opionsBanks = banks.map(bank => ({
  label: `${bank.code} - ${bank.fullName}`,
  value: bank.fullName,
}));
// export const loadOptionsBank = (inputValue: string, callback: any): void => {
//   setTimeout(() => {
//     callback(filterOptions(inputValue, opionsBanks));
//   }, 1000);
// };

export const months = ['Janeiro'];

// TIPO DE CONTA DE BANCO
export const OptionsTypeAccount = [
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

export const statusSaleOptions: OptionsData[] = [
  { label: 'Não Validado', value: 'NAO_VALIDADO' },
  { label: 'Pendente', value: 'PENDENTE' },
  { label: 'Pago Total', value: 'PAGO_TOTAL' },
  { label: 'Caíu', value: 'CAIU' },
];

export const optionsBonus = [
  { id: '1', label: 'Sim', value: 'Y' },
  { id: '2', label: 'Não', value: 'N' },
];

export const optionYear = [
  {label: '2021', value: 2021},
  {label: '2022', value: 2022},
  {label: '2023', value: 2023},
  {label: '2024', value: 2024},
  {label: '2025', value: 2025},
  {label: '2026', value: 2026},
  {label: '2027', value: 2027},
  {label: '2028', value: 2028},
  {label: '2029', value: 2029},
  {label: '2030', value: 2030},
]