export const currency = (value: string): number => {
  value = value.replace(/([^\d+,])+/gim, '').replace(',', '.');
  return Number(value);
};

export const unMaked = (value: string): string => {
  value = value.replace(/([^\d+,])+/gim, '').replace(',', '.');
  return value;
};

export const DateYMD = (dateSale: string): string => {
  const [D, M, Y] = dateSale.split('/');
  const date = new Date(Number(Y), Number(M), Number(D));
  console.log(date);
  const year = date.getFullYear();
  let month = date.getMonth();
  let dt = date.getDate();

  if (dt < 10) {
    dt = 0 + dt;
  }
  if (month < 10) {
    month = 0 + month;
  }
  return `${year}-${month}-${dt}`;
};
