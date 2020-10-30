import React, { createContext, useContext, useState } from 'react';

interface FormContextData {
  formData: Object;
  updateFormData(data: Object): void;
  submitForm(): void;
}

const FormContext = createContext({} as FormContextData);

const FormProvider: React.FC = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [dataSteps, setDataSteps] = useState({});

  const updateFormData = (data: Object) => {
    setDataSteps(data);

    Object.assign(formData, dataSteps);
  };

  const submitForm = () => {
    console.log(formData);
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, submitForm }}>
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
