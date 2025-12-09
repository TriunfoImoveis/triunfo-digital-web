import React from 'react';
import { Container } from './styles';
import RealtyFormNew from '../RealtyFormNew';
import RealtyFormUsed from '../RealtyFormNewUsed';

interface ISaleNewData {
  nextStep: () => void;
  typeSale: 'new' | 'used';
}

const Step1: React.FC<ISaleNewData> = ({ nextStep, typeSale }) => {
  return (
    <Container>
      {typeSale === 'new' ? (
        <RealtyFormNew nextStep={nextStep} />
      ) : (
        <RealtyFormUsed nextStep={nextStep} />
      )}
    </Container>
  );
};

export default Step1;
