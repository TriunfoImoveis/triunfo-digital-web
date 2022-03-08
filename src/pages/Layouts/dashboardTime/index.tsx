import React from 'react';
import HeaderDashboard from '../../../components/Header/HeaderDashboardFilial'
import { BackgroundTriunfo } from '../../../assets/images';

import { Container, Content } from './styled';

const DashbordLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <HeaderDashboard />
      <BackgroundTriunfo />
      <Content>{children}</Content>
    </Container>
  );
}

export default DashbordLayout;