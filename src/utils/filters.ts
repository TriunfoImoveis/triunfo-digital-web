interface IUser {
  id: string;
  name: string;
  avatar_url: string | null;
  departament: {
    id: string;
    name: string;
  };
  subsidiary: {
    id: string;
    name: string;
  };
  office: {
    id: string;
    name: string;
  };
}

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

export const filterUserForSubsidiary = (
  users: IUser[],
  subsidiary: string,
): IUser[] => {
  return users.filter(user => user.subsidiary.id === subsidiary);
};
export const filterUserForDepartament = (
  users: IUser[],
  departament: string,
): IUser[] => {
  return users.filter(user => user.departament.id === departament);
};
export const filterUserForOffice = (
  users: IUser[],
  office: string,
): IUser[] => {
  return users.filter(user => user.office.id === office);
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
