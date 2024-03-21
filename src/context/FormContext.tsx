import React, { createContext, useContext, useState } from 'react';

interface Realty {
  enterprise: string;
  zipcode: string;
  state: string;
  city: string;
  neighborhood: string;
  property: string;
  unit: string;
}

interface FormContextData {
  formData: Object;
  updateFormData(data: Object): void;
  initialFormData(): void;
  handleUpdateRealty(realty: Realty): void;
  handleUpdateBuilder(builder: string): void;
  realty: Realty;
  builder: string;
}

const FormContext = createContext({} as FormContextData);

const FormProvider: React.FC = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [realty, setRealty] = useState({} as Realty);
  const [builder, setBuilder] = useState('');
  const initialFormData = () => {
    setFormData({});
  };
  const updateFormData = (data: Object) => {
    const newData = Object.assign(formData, data);
    setFormData(newData);
  };

  const handleUpdateRealty = (realty: Realty) => {
    setRealty(realty);
  };
  const handleUpdateBuilder = (builder: string) => {
    setBuilder(builder);
  };

  return (
    <FormContext.Provider value={{ 
      formData,
      realty,
      builder,
      updateFormData, 
      initialFormData, 
      handleUpdateRealty, 
      handleUpdateBuilder 
    }}>
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
