export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const DateBRL = (dateSale: string): string => {
  const date = new Date(dateSale);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate() + 1;

  if (dt < 10) {
    dt = 0 + dt;
  }
  if (month < 10) {
    month = 0 + month;
  }
  return `${dt}/${month}/${year}`;
};
