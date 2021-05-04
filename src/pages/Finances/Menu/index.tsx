import React from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useAuth } from '../../../context/AuthContext';
import Header from '../../../components/Header/SimpleHeader';
import { FinancesIcons } from '../../../assets/images';
import {
  Container,
  Content,
  UserContainer,
  OptionsContainer,
  Option,
} from './styles';

const Menu: React.FC = () => {
  const { userAuth } = useAuth();
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  });
  return (
    <Container>
      <Header />
      <Content>
        <UserContainer>
          <span>{`Bem-vindo, ${userAuth.name}`}</span>
          <span>{currentDate}</span>
        </UserContainer>
        <OptionsContainer>
          <Option to="/financeiro/caixa">
            <FinancesIcons />
            <span>Recebimentos Futuros</span>
          </Option>
          <Option to="/financeiro/caixa">
            <FinancesIcons />
            <span>Entradas/Saídas</span>
          </Option>
        </OptionsContainer>
      </Content>
    </Container>
  );
};

export default Menu;
