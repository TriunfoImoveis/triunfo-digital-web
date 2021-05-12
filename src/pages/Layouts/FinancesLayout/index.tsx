import React from 'react';
import Header from '../../../components/Header/HeaderFinances';

import { BackgroundTriunfo } from '../../../assets/images';
import { Container, Content } from './styles';

const FinancesLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />
      <BackgroundTriunfo />
      <Content>{children}</Content>
    </Container>
  );
};

export default FinancesLayout;
