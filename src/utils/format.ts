import { parseISO, format } from 'date-fns';

export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const DateBRL = (dateSale: string): string => {
  const parsedDate = parseISO(dateSale);
  const formatDate = format(parsedDate, 'dd/MM/YYY');
  return formatDate;
};

export const formatTextStatus = (textStaus: string): string => {
  let textFormatted = '';
  switch (textStaus) {
    case 'PENDENTE':
      textFormatted = 'Pendente';
      break;
    case 'CAIU':
      textFormatted = 'Caíu';
      break;
    case 'NAO_VALIDADO':
      textFormatted = 'Não Validado';
      break;
    case 'PAGO_TOTAL':
      textFormatted = 'Pago';
      break;
    default:
      break;
  }
  return textFormatted;
};
