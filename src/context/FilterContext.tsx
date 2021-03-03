import React, { createContext, useContext, useState } from 'react';

interface FilterContextData {
  city: string;
  status: string;
  name: string;
  handleSetCity: (city: string) => void;
  handleSetStatus: (status: string) => void;
  handleSetName: (name: string) => void;
}

const FilterContext = createContext({} as FilterContextData);

const FilterProvider: React.FC = ({ children }) => {
  const [city, setCity] = useState<string>('São Luís');
  const [status, setStatus] = useState<string>('NAO_VALIDADO');
  const [name, setName] = useState('');

  const handleSetCity = (city: string) => {
    setCity(city);
  };
  const handleSetStatus = (status: string) => {
    setStatus(status);
  };
  const handleSetName = (name: string) => {
    setName(name);
  };
  return (
    <FilterContext.Provider
      value={{
        city,
        status,
        name,
        handleSetCity,
        handleSetName,
        handleSetStatus,
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