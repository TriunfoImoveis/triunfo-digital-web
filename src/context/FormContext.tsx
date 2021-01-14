import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

interface FormContextData {
  formData: Object;
  updateFormData(data: Object): void;
  submitFormNew(): Promise<void>;
  submitFormUsed(): Promise<void>;
}

const FormContext = createContext({} as FormContextData);

const FormProvider: React.FC = ({ children }) => {
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem('@TriunfoDigital:token');

  console.log(token);

  const updateFormData = (data: Object) => {
    const newData = Object.assign(formData, data);
    setFormData(newData);
  };

  const submitFormNew = useCallback(async () => {
    try {
      await api.post('/sale/new', formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      toast.error(`ERROR ${err}`);
    }
  }, [formData, token]);

  const submitFormUsed = async () => {
    try {
      await api.post('/sale/used', formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      toast.error(`ERROR ${err}`);
    }
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
