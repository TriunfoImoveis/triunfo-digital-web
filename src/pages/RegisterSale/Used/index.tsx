import React, { useState, useCallback } from 'react';

import Header from '../../../components/Header';
import Step1 from '../../../components/Form/Step1';
import Step2 from '../../../components/Form/Step2';
import Step3 from '../../../components/Form/Step3';
import Step4 from '../../../components/Form/Step4';
import ClientSaller from '../../../components/Form/ClientSaller';
import SuccessForm from '../../../components/Form/Success';
import TabNavigator from '../../../components/TabNavigator';
import { Container, Content, FormContainer } from './styles';

const RegisterSaleUsed: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextSpeps = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const prevSpeps = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  function SwitchSteps(stepParm: number) {
    switch (stepParm) {
      case 1:
        return <Step1 nextStep={nextSpeps} typeSale="used" />;
      case 2:
        return (
          <Step2 nextStep={nextSpeps} prevStep={prevSpeps} typeClient="buyer" />
        );
      case 3:
        return <ClientSaller nextStep={nextSpeps} prevStep={prevSpeps} />;
      case 4:
        return (
          <Step3 nextStep={nextSpeps} prevStep={prevSpeps} typeSale="used" />
        );
      case 5:
        return (
          <Step4 nextStep={nextSpeps} prevStep={prevSpeps} typeSale="used" />
        );
      case 6:
        return <SuccessForm typeSale="used" />;
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
          <TabNavigator step={step} typeSale="used" />
          {SwitchSteps(step)}
        </FormContainer>
      </Content>
    </Container>
  );
};

export default RegisterSaleUsed;
