import React from 'react';

import NotFoundImg from '../../../assets/images/ops.svg';
import { Container } from './styles';

const NotFound: React.FC = () => {
  return (
    <Container>
      <h2>Ops !</h2>
      <section>
        <img src={NotFoundImg} alt="Nenhuma venda encontrada" />
      </section>
    </Container>
  );
};

export default NotFound;
