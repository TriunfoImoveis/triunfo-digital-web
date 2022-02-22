import React, { createContext, useContext, useState } from 'react';

interface IRealtor {
  id: string;
  name: string;
  avatar_url: string;
}

interface ISubsidiary {
  id: string;
  name: string;
  city: string;
}

interface FilterContextData {
  city: string;
  status: string;
  name: string;
  month: number;
  year: number;
  group: string;
  subsidiary: string;
  selectedFiliais: string;
  seletedContas: string;
  selectedSubsidiary: string;
  selectedRealtor: string;
  realtors: IRealtor[];
  subsidiaries: ISubsidiary[];
  handleSetCity: (city: string) => void;
  handleSetStatus: (status: string) => void;
  handleSetName: (name: string) => void;
  handleSetMonth: (month: number) => void;
  handleSetYear: (year: number) => void;
  handleSetGroup: (group: string) => void;
  handleSetSubsidiary: (subsidiary: string) => void;
  handleSetFiliais: (filiais:string) => void;
  handleSetContas: (contas: string) => void;
  handleSetSelectedSubsidiaries: (subsidiary: string) => void;
  handleSetSelectedRealtors: (realtor: string) => void;
  handleSetSubsidiaries: (subsidiaries: ISubsidiary[]) => void;
  handleSetRealtors: (realtors: IRealtor[]) => void;
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
  const [selectedFiliais, setSelectedFiliais] = useState<string>('');
  const [seletedContas, setSelectedContas] = useState<string>('');
  const [realtors, setRealtors] = useState<IRealtor[]>([]);
  const [subsidiaries, setSubsidiaries] = useState<ISubsidiary[]>([]);
  const [selectedSubsidiary, setSelectedSubsidiary] = useState("");
  const [selectedRealtor, setselectedRealtor] = useState('');


  const handleSetSubsidiaries = (subsidiaries: ISubsidiary[]) => {
    setSubsidiaries(subsidiaries);
  };
  
  const handleSetRealtors = (realtors: IRealtor[]) => {
    setRealtors(realtors);
  };

  const handleSetSelectedSubsidiaries = (subsidiary: string) => {
    setSelectedSubsidiary(subsidiary);
  };

  const handleSetSelectedRealtors = (realtor: string) => {
    setselectedRealtor(realtor);
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

  const handleSetFiliais = (filial: string) => {
    setSelectedFiliais(filial);
  };

  const handleSetContas = (contas:string) => {
    setSelectedContas(contas);
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
        selectedFiliais,
        seletedContas,
        subsidiary,
        realtors,
        subsidiaries,
        selectedSubsidiary,
        selectedRealtor,
        handleSetCity,
        handleSetName,
        handleSetStatus,
        handleSetMonth,
        handleSetYear,
        handleSetGroup,
        handleSetSubsidiary,
        handleSetFiliais,
        handleSetContas,
        handleSetSelectedSubsidiaries,
        handleSetSelectedRealtors,
        handleSetSubsidiaries,
        handleSetRealtors
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
