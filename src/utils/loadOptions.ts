import banks from '../services/Data/banks';
import { filterOptions } from './filters';

export interface OptionsData {
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

export const optionsMonth = [
  { label: 'TODAS', value: '0' },
  { label: 'JAN', value: '1' },
  { label: 'FEV', value: '2' },
  { label: 'MAR', value: '3' },
  { label: 'ABR', value: '4' },
  { label: 'MAI', value: '5' },
  { label: 'JUN', value: '6' },
  { label: 'JUL', value: '7' },
  { label: 'AGO', value: '8' },
  { label: 'SET', value: '9' },
  { label: 'OUT', value: '10' },
  { label: 'NOV', value: '11' },
  { label: 'DEZ', value: '12' },
]

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
export const states = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernanbuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins'
}
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
  { label: '2020', value: 2020 },
  { label: '2021', value: 2021 },
  { label: '2022', value: 2022 },
  { label: '2023', value: 2023 },
  { label: '2024', value: 2024 },
  { label: '2025', value: 2025 },
  { label: '2026', value: 2026 },
  { label: '2027', value: 2027 },
  { label: '2028', value: 2028 },
  { label: '2029', value: 2029 },
  { label: '2030', value: 2030 },
]

export const optionsUFs: OptionsData[] = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernanbuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
]

export const neighborhoods = [
  {
    state: 'MA', 
    city: 'São Luis', 
    neighborhoods: [
      {name: "Centro"},
      {name: "São Raimundo"},
      {name: "Cohama"},
      {name: "Peninsula"},
    ]
  },
  {
    state: 'MA', 
    city: 'São José de Ribamar', 
    neighborhoods: [
      {name: "Araçagy"},
      {name: "Pindaí"},
    ]
  },
]