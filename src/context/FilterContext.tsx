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
interface FilterContextData {
  city: string;
  status: string;
  name: string;
  month: number;
  year: number;
  group: string;
  subsidiary: string;
  handleSetCity: (city: string) => void;
  handleSetStatus: (status: string) => void;
  handleSetName: (name: string) => void;
  handleSetMonth: (month: number) => void;
  handleSetYear: (year: number) => void;
  handleSetGroup: (group: string) => void;
  handleSetSubsidiary: (subsidiary: string) => void;
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

  const handleSetGroup = (group: string) => {
    setGroup(group);
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
        subsidiary,
        handleSetCity,
        handleSetName,
        handleSetStatus,
        handleSetMonth,
        handleSetYear,
        handleSetGroup,
        handleSetSubsidiary
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
