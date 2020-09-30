import React from 'react';
import Header from '../../components/Header';

import { BackgroundImage } from '../../assets/images';

import { Container, Content, Title } from './styles';

const Ranking: React.FC = () => {
  return (
    <Container>
      <Header />
      <BackgroundImage />
      <Content>
        <Title>Top Five</Title>
      </Content>
    </Container>
  );
};

export default Ranking;
