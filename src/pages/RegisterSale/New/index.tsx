import React from 'react';

import Header from '../../../components/Header';
import Step1 from '../../../components/Form/Step1';
import { Container, Content, FormContainer, TabNavigator } from './styles';

const RegisterSaleNew: React.FC = () => {
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
          <Step1 />
        </FormContainer>
      </Content>
    </Container>
  );
};

export default RegisterSaleNew;
