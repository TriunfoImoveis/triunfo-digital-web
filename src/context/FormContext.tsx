import React, { createContext, useContext, useEffect, useState } from 'react';

type FormData = Record<string, any>;

interface FormContextData {
  formData: FormData;
  stepIndex: number;
  saleType: 'new' | 'used' | '';
  updateFormData(data: FormData): void;
  setStepIndex: React.Dispatch<React.SetStateAction<number>>;
  setSaleType: React.Dispatch<React.SetStateAction<'new' | 'used' | ''>>;
  clearAll(): void;
}

const STORAGE_KEY = 'registerSale:data';
const STEP_KEY = 'registerSale:step';
const TYPE_KEY = 'registerSale:type';

const FormContext = createContext({} as FormContextData);

const FormProvider: React.FC = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });
  const [stepIndex, setStepIndex] = useState<number>(() => {
    const saved = localStorage.getItem(STEP_KEY);
    return saved ? Number(saved) : 0;
  });
  const [saleType, setSaleType] = useState<'new' | 'used' | ''>(() => {
    const saved = localStorage.getItem(TYPE_KEY) as 'new' | 'used' | '';
    return saved || '';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem(STEP_KEY, String(stepIndex));
  }, [stepIndex]);

  useEffect(() => {
    if (saleType) {
      localStorage.setItem(TYPE_KEY, saleType);
    }
  }, [saleType]);

  const updateFormData = (data: FormData) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const clearAll = () => {
    setFormData({});
    setStepIndex(0);
    setSaleType('');
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STEP_KEY);
    localStorage.removeItem(TYPE_KEY);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        stepIndex,
        saleType,
        updateFormData,
        setStepIndex,
        setSaleType,
        clearAll,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

function useForm(): FormContextData {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useForm só pode ser usado com o FormProvider');
  }

  return context;
}

export { FormProvider, useForm };
