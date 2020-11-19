import React, { useState, useCallback } from 'react';

import Header from '../../../components/Header';
import Step1 from '../../../components/Form/Step1';
import Step2 from '../../../components/Form/Step2';
import Step3 from '../../../components/Form/Step3';
import Step4 from '../../../components/Form/Step4';
import SuccessForm from '../../../components/Form/Success';
import TabNavigator from '../../../components/TabNavigator';
import { Container, Content, FormContainer } from './styles';

const RegisterSaleNew: React.FC = () => {
  const [step, setStep] = useState(3);

  const nextSpeps = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const prevSpeps = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  function SwitchSteps(stepParm: number) {
    switch (stepParm) {
      case 1:
        return <Step1 nextStep={nextSpeps} typeSale="new" />;
      case 2:
        return (
          <Step2 nextStep={nextSpeps} prevStep={prevSpeps} typeClient="buyer" />
        );
      case 3:
        return (
          <Step3 nextStep={nextSpeps} prevStep={prevSpeps} typeSale="new" />
        );
      case 4:
        return <Step4 nextStep={nextSpeps} prevStep={prevSpeps} />;
      case 5:
        return <SuccessForm typeSale="new" />;
      default:
        break;
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <header>
          <h1>Cadastrar Vendas</h1>
        </header>
        <FormContainer>
          <TabNavigator step={step} typeSale="new" />
          {SwitchSteps(step)}
        </FormContainer>
      </Content>
    </Container>
  );
};

export default RegisterSaleNew;
