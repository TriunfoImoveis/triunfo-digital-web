import { format, subDays } from 'date-fns';
import React, { createContext, useContext, useState } from 'react';

type ListSales = {
  id: string;
  name: string;
  vgv: string;
  dateSale: string;
  sallers: {
    name: string;
    avatar_url: string;
  };
};

interface Filial {
  id: string;
  name: string;
}

interface Conta {
  id: string
  account: string;
  bank_name: string;
}

interface Params {
  data_inicio: string;
  data_fim: string;
  escritorio?: string;
  conta?: string;
} 

interface FilterContextData {
  city: string;
  status: string;
  name: string;
  month: number;
  year: number;
  group: string;
  subsidiary: string;
  filiais: Filial[];
  contas: Conta[];
  parms: Params;
  handleSetCity: (city: string) => void;
  handleSetStatus: (status: string) => void;
  handleSetName: (name: string) => void;
  handleSetMonth: (month: number) => void;
  handleSetYear: (year: number) => void;
  handleSetGroup: (group: string) => void;
  handleSetSubsidiary: (subsidiary: string) => void;
  handleSetFiliais: (filiais: Filial[]) => void;
  handleSetContas: (contas: Conta[]) => void;
  handleSetParams: (params: Params) => void;
  initialParams: () => void;
}

const FilterContext = createContext({} as FilterContextData);

const FilterProvider: React.FC = ({ children }) => {
  const [city, setCity] = useState<string>('São Luís');
  const [status, setStatus] = useState<string>('NAO_VALIDADO');
  const [name, setName] = useState('');
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const [group, setGroup] = useState('');
  const [subsidiary, setSubsidiary] = useState<string>('');
  const [filiais, setFiliais] = useState<Filial[]>([]);
  const [contas, setContas] = useState<Conta[]>([]);
  const [parms, setParms] = useState({
    data_inicio: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    data_fim: format(new Date(), 'yyyy-MM-dd'),
  } as Params);

  const handleSetParams = (params: Params) => {
    setParms(params);
  };


  const handleSetCity = (city: string) => {
    setCity(city);
  };
  const handleSetSubsidiary = (subsidiary: string) => {
    setSubsidiary(subsidiary);
  };
  const handleSetStatus = (status: string) => {
    setStatus(status);
  };
  const handleSetName = (name: string) => {
    setName(name);
  };
  const handleSetMonth = (month: number) => {
    setMonth(month);
  };

  const handleSetYear = (year: number) => {
    setYear(year);
  };

  const handleSetFiliais = (filiais: Filial[]) => {
    setFiliais(filiais);
  };

  const handleSetContas = (contas: Conta[]) => {
    setContas(contas);
  };

  const handleSetGroup = (group: string) => {
    setGroup(group);
  };

  const initialParams = () => {
    handleSetParams({
      data_inicio: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
      data_fim: format(new Date(), 'yyyy-MM-dd'),
    });
  };

  return (
    <FilterContext.Provider
      value={{
        city,
        status,
        name,
        month,
        year,
        group,
        filiais,
        contas,
        parms,
        subsidiary,
        handleSetCity,
        handleSetName,
        handleSetStatus,
        handleSetMonth,
        handleSetYear,
        handleSetGroup,
        handleSetSubsidiary,
        handleSetFiliais,
        handleSetContas,
        handleSetParams,
        initialParams
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

function useFilter(): FilterContextData {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error('useFilter só pode ser usado com o FilterProvider');
  }

  return context;
}

export { FilterProvider, useFilter };
