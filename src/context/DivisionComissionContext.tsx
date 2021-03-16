import React, { createContext, useCallback, useContext, useState } from 'react';
import { formatPrice } from '../utils/format';
import { currency } from '../utils/unMasked';

interface Division {
  id: string;
  name: string;
  porcent: string;
  total?: string;
}

interface DivisionContextData {
  divisionData: Division[];
  sald: string;
  handleSetDivision: (divisionData: Division[]) => void;
  calcDivision: (comissionSubsiary: string) => void;
}

const DivisionContext = createContext({} as DivisionContextData);

const DivisionProvider: React.FC = ({ children }) => {
  const [divisionData, setDivisionData] = useState<Division[]>([
    {
      id: Math.random().toString(16),
      name: 'PL',
      porcent: '10',
    },
    {
      id: Math.random().toString(16),
      name: 'LUCRO',
      porcent: '8',
    },
    {
      id: Math.random().toString(16),
      name: 'IMPOSTO',
      porcent: '5',
    },
  ]);
  const [sald, setSald] = useState('');

  const handleSetDivision = useCallback((divisionData: Division[]) => {
    setDivisionData(divisionData);
  }, []);

  const calcDivision = useCallback(
    (comissionSubsiary: string) => {
      const divisonCalculated = divisionData.map(division => ({
        ...division,
        total: formatPrice(
          (Number(division.porcent) / 100) * currency(comissionSubsiary),
        ),
      }));

      const reduce = (accumulator, currentValue) => accumulator + currentValue;

      const somaDivision = divisonCalculated
        .map(division => currency(division.total))
        .reduce(reduce);
      const sald = formatPrice(currency(comissionSubsiary) - somaDivision);
      setSald(sald);
      setDivisionData(divisonCalculated);
    },
    [divisionData],
  );

  return (
    <DivisionContext.Provider
      value={{ divisionData, handleSetDivision, calcDivision, sald }}
    >
      {children}
    </DivisionContext.Provider>
  );
};

function useDivision(): DivisionContextData {
  const context = useContext(DivisionContext);

  if (!context) {
    throw new Error('useDivision só pode ser usado com o DivisionProvider');
  }

  return context;
}

export { DivisionProvider, useDivision };
