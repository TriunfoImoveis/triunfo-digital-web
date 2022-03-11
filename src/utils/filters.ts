import {
  getMonth,
  getYear,
  isAfter,
  isBefore,
  isToday,
  parseISO,
} from 'date-fns';

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

type ParticipantSale =
  | 'VENDEDOR'
  | 'CAPTADOR'
  | 'COORDENADOR'
  | 'DIRETOR'
  | 'EMPRESA';

interface Participantes {
  user?: string;
  participant_type: string;
  comission_percentage: string;
  comission_integral: string;
  tax_percentage?: number;
  tax_value?: string;
  comission_liquid: string;
}

interface Division {
  division_type: {
    id: string;
  };
  percentage: string;
  value: string;
}
interface CalculatorData {
  calculation: {
    note_value: string;
    participants: Participantes[];
    divisions: Division[];
  };
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
  console.log({subsidiary})
  return users.filter(user => user.subsidiary.id === subsidiary && user);
};
export const filterUserForDepartament = (
  users: IUser[],
  departament: string,
): IUser[] => {
  return users.filter(user => user.departament.id === departament && user);
};
export const filterUserForOffice = (
  users: IUser[],
  office: string,
): IUser[] => {
  return users.filter(user => user.office.name === office && users);
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

const reducer = (accumulator, currentValue) => accumulator + currentValue;

export const generateValueBruteSubsidiary = (sale: CalculatorData): number => {
  const valueBrute = sale.calculation.participants
    .map(item =>
      item.participant_type === 'EMPRESA' ? Number(item.comission_integral) : 0,
    )
    .reduce(reducer, 0);

  return valueBrute;
};
export const generateValueBruteSubsidiaryLiquid = (
  sale: CalculatorData,
): number => {
  const valueLiquid = sale.calculation.participants
    .map(item =>
      item.participant_type === 'EMPRESA' ? Number(item.comission_liquid) : 0,
    )
    .reduce(reducer, 0);

  return valueLiquid;
};

export const generateValueBrute = (
  sale: CalculatorData[],
  typeParticipants: ParticipantSale,
): number => {
  return sale
    .map(item => item.calculation.participants && item.calculation.participants)
    .map(item => {
      return item
        .map(item =>
          item.participant_type === typeParticipants
            ? Number(item.comission_integral)
            : 0,
        )
        .reduce(reducer, 0);
    })
    .reduce(reducer, 0);
};
export const generateValueLiquid = (
  sale: CalculatorData[],
  typeParticipants: ParticipantSale,
): number => {
  return sale
    .map(item => item.calculation.participants && item.calculation.participants)
    .map(item => {
      return item
        .map(item =>
          item.participant_type === typeParticipants
            ? Number(item.comission_liquid)
            : 0,
        )
        .reduce(reducer, 0);
    })
    .reduce(reducer, 0);
};

export const generateImpostValue = (sale: CalculatorData[]) => {
  return sale
    .map(item =>
      item.calculation.note_value ? Number(item.calculation.note_value) : 0,
    )
    .reduce(reducer, 0);
};

export const generateDivionValue = (
  sale: CalculatorData[],
  typeDivision: string,
) => {
  return sale
    .map(item => item.calculation.divisions && item.calculation.divisions)
    .map(item => {
      return item
        .map(item =>
          item.division_type.id === typeDivision ? Number(item.value) : 0,
        )
        .reduce(reducer, 0);
    })
    .reduce(reducer, 0);
};

export const filterDay = (data: string) => {
  const parsedDate = parseISO(data);
  const today = isToday(parsedDate);
  if (!today) {
    // eslint-disable-next-line
              return false;
  }
  return true;
};
export const filterMonth = (data: string, month: number) => {
  const parsedDate = parseISO(data);
  const monthDateSale = getMonth(parsedDate) + 1;
  if (monthDateSale === month) {
    // eslint-disable-next-line
    return true;
  }
  return false;
};

export const filterTimeSlot = (
  dataActual: string,
  dateInitial: string,
  dateFinaly: string,
) => {
  if (
    isAfter(parseISO(dataActual), parseISO(dateInitial)) &&
    isBefore(parseISO(dataActual), parseISO(dateFinaly))
  ) {
    return true;
  }
  return false;
};
export const filterYear = (data: string, year: number) => {
  const parsedDate = parseISO(data);
  const newYear = getYear(parsedDate);
  if (!(newYear === year)) {
    // eslint-disable-next-line
    return false;
  }
  return true;
};

export const filterGroup = (actualGroup: string, group: string) => {
  if (actualGroup === group) {
    return true;
  }
  return false;
};
