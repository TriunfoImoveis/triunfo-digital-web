import React from 'react';
import Header from '../../../components/Header';

import { BackgroundTriunfo } from '../../../assets/images';
import { Container, Content } from './styles';

const AdmLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header type="adm" />
      <BackgroundTriunfo />
      <Content>{children}</Content>
    </Container>
  );
};

export default AdmLayout;
