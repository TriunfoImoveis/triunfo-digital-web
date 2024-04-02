import React, { createContext, useCallback, useContext, useState } from 'react';
import { formatPrice } from '../utils/format';
import { currency } from '../utils/unMasked';

interface Division {
  id: string;
  name: string;
  porcent: string;
  total?: string;
}
type Realtor = {
  id: string;
  name: string;
};
type Installment = {
  id: string;
  value: number;
  valueBRL: string;
  id_sale: string;
  type_sale: string;
  sellers: Realtor[];
  captvators: Realtor[] | null;
  coordinator: Realtor | null;
  directors: Realtor[];
  subsidiary: string;
  builder: string | null;
};

interface CalculatorContextData {
  divisionData: Division[];
  sald: string;
  comission: Installment;
  handleSetDivision: (divisionData: Division[]) => void;
  calcDivision: (comissionSubsiary: string) => void;
  handleSetComission: (installment: Installment) => Promise<void>;
  initialValue: () => void;
}

const CalculatorContext = createContext({} as CalculatorContextData);

const CalculatorProvider: React.FC = ({ children }) => {
  const [divisionData, setDivisionData] = useState<Division[]>([
    {
      id: '',
      name: '',
      porcent: '0',
    },
  ]);
  const [sald, setSald] = useState('');
  const [comission, setComission] = useState({} as Installment);

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
  const handleSetComission = async (installment: Installment) => {
    setComission(installment);
  };

  const initialValue = () => {
    setDivisionData([
      {
        id: '',
        name: '',
        porcent: '0',
      },
    ]);
    setSald('');
    setComission({} as Installment);
  };

  return (
    <CalculatorContext.Provider
      value={{
        divisionData,
        handleSetDivision,
        calcDivision,
        sald,
        comission,
        handleSetComission,
        initialValue,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

function useCalculator(): CalculatorContextData {
  const context = useContext(CalculatorContext);

  if (!context) {
    throw new Error('useDivision só pode ser usado com o DivisionProvider');
  }

  return context;
}

export { CalculatorProvider, useCalculator };
