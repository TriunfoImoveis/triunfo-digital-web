export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const DateBRL = (dateSale: string): string => {
  const date = new Date(dateSale);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dt = date.getDate() + 1;

  let dia = dt.toString();
  let mes = month.toString();
  if (dt < 10) {
    dia = `0${dia}`;
  }
  if (month < 10) {
    mes = `0${mes}`;
  }
  return `${dia}/${mes}/${year}`;
};
