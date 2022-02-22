import { formatPrice } from "./format";

export const transformNumberInString = (value: number) => {
  return String(value);
}
export const transformValue = (value: number) => {
  let zeros = 0
  const number = formatPrice(value);
  const arr = number.split(".");
  const arr2 = arr[arr.length - 1].split(',');
  if (arr.length <= 2) {
    zeros = `${arr2[0]}`.split("").length;
  }
  
  if (arr.length > 2) {
    zeros = `${arr[1]}${arr2[0]}`.split("").length;
  }
  let numformatted = ''
  switch (zeros) {
    case 3:
      numformatted = `${arr[0]}K`;
      break;
    case 6: 
      numformatted = `${arr[0]}M`;
      break;
    case 9: 
      numformatted = `${arr[0]}Bi`;
      break;
    default:
      numformatted = number;
      break;
  }

  return numformatted;
} 

export const transformPorcent = (value: number) => {
  return `${value}%`;
}

export const labelsMonth = [
  'Janeiro',  
  'Fevereiro', 
  'Março',  
  'Abril', 
  'Maio', 
  'Junho', 
  'Julho', 
  'Agosto', 
  'Setembro', 
  'Outubro', 
  'Novembro', 
  'Dezembro'
];

export const labelClassImovel = [
  'Medio',
  'Médio/Alto',
  'Alto',
]

export const labelTipoImovel = [
  'Apartamento',
  'Casa em condomínio'
];
