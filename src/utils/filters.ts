interface OptionsData {
  label: string;
  value: string;
}

interface IUserSales {
  id: string;
  property: string;
  date_sale: string;
  vgv: string;
  status: string;
}

export const filterOptions = (
  inputValue: string,
  options: OptionsData[],
): OptionsData[] => {
  return options.filter(option =>
    option.label.toLowerCase().includes(inputValue.toLowerCase()),
  );
};

export const filterSalesForStatus = (
  sales: IUserSales[],
  selectedStatus: string,
): IUserSales[] => {
  return sales.filter(sale => sale.status === selectedStatus);
};
