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
  return `${Y}-${M}-${D}`;
};
