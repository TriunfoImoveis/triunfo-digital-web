import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';

import Header from '../../components/Header';
import LandinImg from '../../assets/images/casa-venda.svg';
import { Container, Content, ButtonGroup } from './styles';

const Action: React.FC = () => {
  const history = useHistory();
  const handleNavigateToRegisterSaleNew = useCallback(() => {
    history.push('/vendas-novo');
  }, [history]);
  return (
    <Container>
      <Header />
      <Content>
        <h1>Selecione o tipo de venda</h1>
        <img src={LandinImg} alt="Casa" />
        <ButtonGroup>
          <Button type="button" onClick={handleNavigateToRegisterSaleNew}>
            Novos
          </Button>
          <Button type="button">Usados</Button>
        </ButtonGroup>
      </Content>
    </Container>
  );
};

export default Action;
