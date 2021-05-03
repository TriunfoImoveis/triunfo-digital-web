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
  handleSetCity: (city: string) => void;
  handleSetStatus: (status: string) => void;
  handleSetName: (name: string) => void;
  handleSetMonth: (name: number) => void;
}

const FilterContext = createContext({} as FilterContextData);

const FilterProvider: React.FC = ({ children }) => {
  const [city, setCity] = useState<string>('São Luís');
  const [status, setStatus] = useState<string>('NAO_VALIDADO');
  const [name, setName] = useState('');
  const [month, setMonth] = useState(0);

  const handleSetCity = (city: string) => {
    setCity(city);
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
  return (
    <FilterContext.Provider
      value={{
        city,
        status,
        name,
        month,
        handleSetCity,
        handleSetName,
        handleSetStatus,
        handleSetMonth,
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
