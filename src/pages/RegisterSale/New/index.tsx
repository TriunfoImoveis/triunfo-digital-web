import React, { useState, useCallback } from 'react';

import Header from '../../../components/Header';
import Step1 from '../../../components/Form/Step1';
import { Container, Content, FormContainer, TabNavigator } from './styles';

const RegisterSaleNew: React.FC = () => {
  const [step, setStep] = useState(1);
  const SaleNewData = useCallback((data: object) => {
    console.log(data);
  }, []);

  const nextSpeps = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  function SwitchSteps(stepParm: number) {
    switch (stepParm) {
      case 1:
        return <Step1 SaleNewData={SaleNewData} nextStep={nextSpeps} />;

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
          <span>VENDA</span>
        </header>
        <FormContainer>
          <TabNavigator />
          {SwitchSteps(step)}
        </FormContainer>
      </Content>
    </Container>
  );
};

export default RegisterSaleNew;
