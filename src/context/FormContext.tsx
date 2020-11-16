import React, { createContext, useContext, useState } from 'react';

interface FormContextData {
  formData: Object;
  updateFormData(data: Object): void;
  submitFormNew(): void;
  submitFormUsed(): void;
}

const FormContext = createContext({} as FormContextData);

const FormProvider: React.FC = ({ children }) => {
  const [formData, setFormData] = useState({});

  const updateFormData = (data: Object) => {
    const newData = Object.assign(formData, data);
    setFormData(newData);
  };

  const submitFormNew = () => {
    console.log(formData);
  };

  const submitFormUsed = () => {
    console.log(formData);
  };

  return (
    <FormContext.Provider
      value={{ formData, updateFormData, submitFormNew, submitFormUsed }}
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
