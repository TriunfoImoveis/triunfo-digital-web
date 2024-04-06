import React, { useEffect } from 'react';
import { Container } from './styles';
import RealtyFormNew from '../RealtyFormNew';
import RealtyFormUsed from '../RealtyFormNewUsed';
import { useForm } from '../../../context/FormContext';

interface ISaleNewData {
  nextStep: () => void;
  typeSale: 'new' | 'used';
}

const Step1: React.FC<ISaleNewData> = ({ nextStep, typeSale }) => {
  const { initialFormData } = useForm();

  useEffect(() => {
    initialFormData();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      {typeSale === 'new' ? (
        <RealtyFormNew nextStep={nextStep} />
      ): (
        <RealtyFormUsed nextStep={nextStep} />
      )}
    </Container>
  );
};

export default Step1;
